import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const booking =
  'https://docs.google.com/forms/d/1HhmbzN6esy_Y-aFH37kuYePjXYxKx-KiR8Lh6tjUCws/viewform';

test('renders cleanly, preserves booking and navigates to anchored sections', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Book Now', exact: true })).toHaveAttribute(
    'href',
    booking
  );
  await page.locator('header').getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.getByRole('heading', { name: /Exceptional drinks/ })).toBeInViewport();
  await page.locator('#services .card-toggle').first().hover();
  await expect(page.getByText('Custom spirit selection')).toBeVisible();
  expect(errors).toEqual([]);
});

test('booking follows the original Google Form destination', async ({ page }) => {
  await page.route('https://docs.google.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<h1>Existing SlushUp booking destination</h1>'
    })
  );
  await page.goto('/');
  await page.getByRole('link', { name: 'Book Now', exact: true }).click();
  await expect(page).toHaveURL(booking);
});

test('mobile menu traps focus, closes on selection and restores focus on Escape', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: /Gallery/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#gallery$/);
});

test('filters deep-link, expand and open a keyboard accessible lightbox', async ({ page }) => {
  await page.goto('/?album=bars#gallery');
  await expect(page.locator('.gallery-item')).toHaveCount(5);
  await page.getByRole('link', { name: 'Drinks', exact: true }).click();
  await expect(page).toHaveURL(/album=drinks/);
  await expect(page.locator('.gallery-item')).toHaveCount(6);
  await page.getByRole('button', { name: 'Explore the Full Gallery' }).click();
  await expect(page.locator('.gallery-item')).toHaveCount(19);
  const trigger = page.locator('.gallery-item').first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('01 / 19')).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByText('19 / 19')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByText('01 / 19')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.reload();
  await expect(page.locator('.gallery-item')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Drinks', exact: true })).toHaveAttribute(
    'aria-current',
    'true'
  );
});

test('occasion carousel supports controls and keyboard', async ({ page }) => {
  await page.goto('/#occasions');
  const next = page.getByRole('button', { name: 'Next occasion' });
  await expect(next).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Show Weddings', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  await next.click();
  await expect(
    page.getByRole('button', { name: 'Show Professionals', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
  await next.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('button', { name: 'Show Birthday Parties', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
});

test('mobile services swipe through Embla and remain keyboard operable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#services');
  await expect(page.getByRole('region', { name: 'Cookie choices' })).toBeVisible();
  await page.locator('.services-viewport').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Next service' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next service' }).click();
  await expect(page.locator('.service-controls > span')).toHaveText('02 / 04');
  const summary = page.locator('#services .card-toggle').nth(1);
  await expect
    .poll(async () => {
      const bounds = await summary.boundingBox();
      return bounds ? Math.abs(bounds.x - 20) : Infinity;
    })
    .toBeLessThan(3);
  await page.keyboard.press('Tab');
  await summary.focus();
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Custom recipe development')).toBeVisible();
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`responsive rendering has no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
    ).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const id of ['experience', 'services', 'occasions', 'gallery', 'about', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
      ).toBe(true);
    }
    await expect(page.locator('footer')).toBeVisible();
  });
}

test('reduced motion avoids animation dependencies and smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto'
  );
  expect(requests.some((url) => /ScrollTrigger|lenis/.test(url))).toBe(false);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('critical content and booking work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Book Now', exact: true })).toHaveAttribute(
    'href',
    booking
  );
  await expect(page.locator('.card-face').first()).toContainText('Your venue. Our bar.');
  await expect(page.locator('.hero-photo img')).toBeVisible();
  await context.close();
});

test('WCAG 2.2 AA: desktop, lightbox and mobile menu', async ({ page }) => {
  await page.goto('/');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.locator('.gallery-item').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
});

test('mobile touch swipe advances services through Embla', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Touch dispatch uses the Chromium DevTools protocol.');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#services');
  await page.locator('.services-viewport').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Next service' })).toBeEnabled();
  const viewport = await page.locator('.services-viewport').boundingBox();
  if (!viewport) {
    throw new Error('Service carousel is missing.');
  }

  const session = await page.context().newCDPSession(page);
  const startX = viewport.x + viewport.width * 0.82;
  const endX = viewport.x + viewport.width * 0.15;
  const y = viewport.y + 140;
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: startX, y }]
  });
  for (let step = 1; step <= 12; step += 1) {
    const x = startX + ((endX - startX) * step) / 12;
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.locator('.service-controls > span')).toHaveText('02 / 04');
  await session.detach();
});

test('setup film loads on demand and stops when the modal closes', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('.mp4')) {
      requests.push(request.url());
    }
  });
  await page.goto('/');
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: /Meet your mobile bar/ }).click();
  const dialog = page.getByRole('dialog');
  const video = dialog.locator('video');
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute('controls', '');
  await expect
    .poll(() => video.evaluate((element) => (element as HTMLVideoElement).readyState))
    .toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('video')).toHaveCount(0);
});

test('canonical, sharing image, sitemap, robots and missing URLs are valid', async ({
  page,
  request
}) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://slushuptt.com/'
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://slushuptt.com/og-slushup.jpg'
  );
  expect((await request.get('/og-slushup.jpg')).status()).toBe(200);
  const structuredData = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText()
  );
  const organization = structuredData['@graph'].find(
    (node: { '@type': string }) => node['@type'] === 'Organization'
  );
  expect(organization.logo).toBe('https://slushuptt.com/slushup-logo-512.webp');
  expect((await request.get('/slushup-logo-512.webp')).status()).toBe(200);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /\/favicon\.ico\?v=3$/);
  expect((await request.get('/slushup-icon.png')).status()).toBe(200);
  expect(await (await request.get('/sitemap.xml')).text()).toContain(
    '<loc>https://slushuptt.com/</loc>'
  );
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://slushuptt.com/sitemap.xml'
  );
  expect((await request.get('/a-page-that-does-not-exist/')).status()).toBe(404);
});
