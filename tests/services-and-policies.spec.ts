import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390, 901, 1440]) {
  test(`service faces stay within fixed cards at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#services');
    const cards = page.locator('.service-card');
    const toggle = cards.first().getByRole('button');
    await toggle.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);

    const geometry = () =>
      page.evaluate(() => ({
        cards: [...document.querySelectorAll('.service-card')].map((card) => {
          const box = card.getBoundingClientRect();
          return { width: box.width, height: box.height, top: box.top + scrollY };
        }),
        nextSection: document.querySelector('#occasions')!.getBoundingClientRect().top + scrollY,
        documentHeight: document.documentElement.scrollHeight
      }));
    const before = await geometry();
    expect(before.cards.map((card) => card.height)).toEqual([460, 460, 460, 460]);

    await toggle.hover();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(cards.first().locator('.service-details')).toHaveCSS(
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)'
    );
    expect(await geometry()).toEqual(before);

    await page.mouse.move(0, 0);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Tab');
    await toggle.focus();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(await geometry()).toEqual(before);

    const contentFits = await cards.evaluateAll((elements) =>
      elements.every((card) =>
        [...card.querySelectorAll('.card-face, .service-details')].every(
          (face) => face.scrollHeight <= face.clientHeight + 1
        )
      )
    );
    expect(contentFits).toBe(true);
  });
}

test('touch toggles details twice without resizing the page', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  await page.goto('/#services');
  const toggle = page.locator('.card-toggle').first();
  await toggle.scrollIntoViewIfNeeded();
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await toggle.tap();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.tap();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(height);
  await context.close();
});

const policies = [
  ['privacy-policy', 'Privacy Policy'],
  ['terms-and-conditions', 'Terms & Conditions'],
  ['cookie-policy', 'Cookie Policy']
];

for (const [route, title] of policies) {
  test(`${title} is a static, accessible business letter`, async ({ browser, request }) => {
    const response = await request.get(`/${route}/`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('Dear Valued Guest');
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${route}/`);
      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
      const letter = page.locator('.policy-letter');
      await expect(letter).toContainText('The SlushUp Team');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      const box = await letter.boundingBox();
      expect(box!.width).toBeLessThanOrEqual(900);
      expect(Math.abs(box!.x - (width - box!.width) / 2)).toBeLessThan(1);
      await expect(
        page
          .getByRole('navigation', { name: 'Footer navigation' })
          .getByRole('link', { name: 'Services' })
      ).toHaveAttribute('href', '/#services');
      if (width === 1440) {
        await page.screenshot({ path: `artifacts/${route}.png`, fullPage: true });
      }
    }
    await context.close();

    const interactiveContext = await browser.newContext();
    const interactive = await interactiveContext.newPage();
    await interactive.goto(`/${route}/`);
    expect(
      (
        await new AxeBuilder({ page: interactive })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations
    ).toEqual([]);
    await interactiveContext.close();
  });
}
