import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../src/lib/content/projects';

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`portfolio stays within the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const failures: string[] = [];
    page.on('pageerror', (error) => failures.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('RennieMaharaj.');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            [...document.images].filter((image) => image.complete && image.naturalWidth === 0)
              .length
        )
      )
      .toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(failures).toEqual([]);
    await expect(page.locator('a[href*="instagram"]')).toHaveCount(0);
    await expect(page.locator('#contact a[href="tel:+18685799523"]')).toBeVisible();
    await expect(
      page.locator('#contact a[href="mailto:rvesprey@gmail.com"]').first()
    ).toBeVisible();
  });
}

test('mobile menu traps focus, closes with Escape, and navigates to work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Selected work' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#work$/);
});

test('services remain keyboard operable and repository filters update the gallery', async ({
  page
}) => {
  await page.goto('/');
  const summary = page.locator('summary').filter({ hasText: 'Systems integration' });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').filter({ has: summary })).toHaveAttribute('open', '');
  await expect(
    page.getByText('Data mapping, validation, API integration, and dependable workflows.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Infrastructure', exact: true }).click();
  await expect(page.locator('.repository-grid > a')).toHaveCount(2);
  await expect(page.locator('.repository-grid')).toContainText('Windows VM');
  await expect(page.locator('.repository-grid')).not.toContainText('News-Go');
  await page.getByRole('button', { name: 'All projects', exact: true }).click();
  await expect(page.locator('.repository-grid > a')).toHaveCount(6);
});

for (const project of projects) {
  test(`${project.name} has a prerendered case study and working source links`, async ({
    page,
    request
  }) => {
    const response = await request.get(`/projects/${project.slug}/`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(project.architecture);
    await page.goto(`/projects/${project.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.name);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole('link', { name: 'View source' })).toHaveAttribute(
      'href',
      `https://github.com/${project.repo}`
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://thewriterco.com/projects/${project.slug}/`
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}

test('critical content, services, and project pages work without JavaScript', async ({
  browser
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  try {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Rennie');
    await page.locator('summary').filter({ hasText: 'Automation & analytics' }).click();
    await expect(
      page.getByText('Practical tools that make existing processes easier to operate.')
    ).toBeVisible();
    await page.getByRole('link', { name: 'Inside the project' }).first().click();
    await expect(page.getByRole('heading', { name: 'How it fits together' })).toBeVisible();
  } finally {
    await context.close();
  }
});

test('reduced motion skips animation libraries', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(1600);
  const resources = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((item) => item.name)
  );
  expect(resources.some((url) => /ScrollTrigger|lenis|motion\/page/.test(url))).toBe(false);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto'
  );
});

test('desktop, mobile menu, and case study pass automated accessibility checks', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.goto('/projects/aircon/');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
});

test('social metadata, sitemap, media credits, and missing pages are correct', async ({
  request,
  page
}) => {
  const home = await request.get('/');
  const html = await home.text();
  expect(html).toContain('https://thewriterco.com/og-rennie.jpg');
  expect(html).not.toMatch(/slushuptt|instagram\.com|forms\.google|docs\.google\.com\/forms/i);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('/projects/go-api-kit/');
  expect((await request.get('/og-rennie.jpg')).status()).toBe(200);
  await page.goto('/credits/');
  await expect(page.getByRole('link', { name: 'OpenStreetMap contributors' })).toHaveAttribute(
    'href',
    'https://www.openstreetmap.org/copyright'
  );
  expect((await request.get('/projects/unknown/')).status()).toBe(404);
});
