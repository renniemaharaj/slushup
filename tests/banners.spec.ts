import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const consentKey = 'slushup:cookie-consent:v1';
const dismissalKey = 'slushup:promotion:end-of-year-2026:dismissed-version';

async function currentVisit(page: import('@playwright/test').Page) {
  await page.clock.install({ time: new Date('2026-11-15T16:00:00Z') });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Cookie choices' })).toBeVisible();
}

test('promotion opens its complete artwork and remembers dismissal across routes and reloads', async ({
  page
}) => {
  await currentVisit(page);
  const promotion = page.locator('.banner.promotion');
  await expect(promotion).toContainText('20% Off Your Quotation');
  await page.getByRole('button', { name: 'View Promotion', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveCSS('object-fit', 'contain');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await promotion.getByRole('button', { name: /^Open / }).click();
  await page.getByRole('button', { name: 'Close promotion', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await promotion.getByRole('button', { name: /^Open / }).click();
  await page.locator('.dialog-overlay').click({ position: { x: 2, y: 2 } });
  await expect(dialog).toHaveCount(0);
  const heroTop = () =>
    page.locator('#hero').evaluate((hero) => hero.getBoundingClientRect().top + scrollY);
  const before = await heroTop();
  await page.getByRole('button', { name: /^Dismiss End of Year/ }).click();
  await expect(promotion).toHaveCount(0);
  await expect.poll(heroTop).toBeLessThan(before);
  expect(await page.evaluate((key) => localStorage.getItem(key), dismissalKey)).toBe('1');
  await page.reload();
  await expect(page.locator('.banner.cookie')).toBeVisible();
  await expect(promotion).toHaveCount(0);
  await page.goto('/privacy-policy/');
  await expect(page.locator('.banner.cookie')).toBeVisible();
  await expect(promotion).toHaveCount(0);
});

test('cookie rejection persists and customization can later change individual categories', async ({
  page
}) => {
  await currentVisit(page);
  const before = await page.locator('.banner-region').evaluate((region) => region.clientHeight);
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  await expect(page.locator('.banner.cookie')).toHaveCount(0);
  await expect
    .poll(() => page.locator('.banner-region').evaluate((region) => region.clientHeight))
    .toBeLessThan(before);
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), consentKey)
  ).toMatchObject({ necessary: true, analytics: false, marketing: false });
  await page.reload();
  await expect(page.locator('.banner.promotion')).toBeVisible();
  await expect(page.locator('.banner.cookie')).toHaveCount(0);
  await page.getByRole('button', { name: 'Cookie preferences', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Optional analytics').check();
  await expect(dialog.getByLabel('Optional marketing')).not.toBeChecked();
  await dialog.getByRole('button', { name: 'Save preferences' }).click();
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), consentKey)
  ).toMatchObject({ analytics: true, marketing: false });
});

for (const width of [360, 768, 1440]) {
  test(`banner lane stays clear of navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await currentVisit(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    const controlsFit = await page.locator('.banner').evaluateAll((banners) =>
      banners.every((banner) => {
        const box = banner.getBoundingClientRect();
        return [...banner.querySelectorAll('button, a')].every((control) => {
          const child = control.getBoundingClientRect();
          return (
            child.left >= box.left - 1 &&
            child.right <= box.right + 1 &&
            child.bottom <= box.bottom + 1
          );
        });
      })
    );
    expect(controlsFit).toBe(true);
    const region = await page.locator('.banner-region').boundingBox();
    expect(region!.height).toBeLessThanOrEqual(width <= 900 ? 360 : 216);
    const header = await page.locator('header').first().boundingBox();
    expect(header!.y).toBeGreaterThan(region!.y + region!.height);
    await page.screenshot({ path: `artifacts/banners-initial-${width}.png` });
    await page.getByRole('button', { name: 'Customize', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', { name: 'Accept all', exact: true }).click();
    expect(
      await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), consentKey)
    ).toMatchObject({ analytics: true, marketing: true });
    await page.screenshot({ path: `artifacts/banners-${width}.png` });
    await expect
      .poll(() => page.locator('.banner-region').evaluate((region) => region.clientHeight))
      .toBeLessThan(region!.height);
    const promotion = await page.locator('.banner.promotion').boundingBox();
    const singleRegion = await page.locator('.banner-region').boundingBox();
    expect(singleRegion!.height).toBeCloseTo(promotion!.height + 24, 0);
    await page.getByRole('button', { name: /^Dismiss End of Year/ }).click();
    await expect
      .poll(() => page.locator('.banner-region').evaluate((region) => region.clientHeight))
      .toBe(0);
    await expect
      .poll(() =>
        page
          .locator('header')
          .first()
          .evaluate((header) => header.getBoundingClientRect().top)
      )
      .toBe(width <= 900 ? 12 : 20);
  });
}

test('scheduled banners activate and expire while the page remains open', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-10-01T03:59:00Z') });
  await page.clock.pauseAt(new Date('2026-10-01T03:59:59Z'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.banner.cookie')).toBeVisible();
  await expect(page.locator('.banner.promotion')).toHaveCount(0);
  await page.clock.fastForward(1100);
  await expect(page.locator('.banner.promotion')).toHaveCount(1);
  await page.clock.setSystemTime(new Date('2027-01-01T03:59:59Z'));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(page.locator('.banner.promotion')).toHaveCount(1);
  await page.clock.fastForward(1100);
  await expect(page.locator('.banner.promotion')).toHaveCount(0);
});

test('banners and cookie preferences have no automated accessibility violations', async ({
  page
}) => {
  await currentVisit(page);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.getByRole('button', { name: 'Customize', exact: true }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations
  ).toEqual([]);
});
