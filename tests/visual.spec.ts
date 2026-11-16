import { expect, test } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`visual regression at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.clock.setFixedTime(new Date('2026-11-15T16:00:00Z'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('region', { name: 'Cookie choices' })).toBeVisible();
    await expect(page.locator('.banner.promotion')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const id of [
      'hero',
      'experience',
      'services',
      'occasions',
      'gallery',
      'about',
      'contact',
      'footer'
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      if (id === 'occasions') {
        await expect(page.getByRole('button', { name: 'Next occasion' })).toBeEnabled();
      }
      await page
        .locator(`#${id} img`)
        .evaluateAll((images) =>
          Promise.all(images.map((image) => (image as HTMLImageElement).decode().catch(() => {})))
        );
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    // Keep transformed carousel slides inside the viewport during full-page capture.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width, height });

    await expect(page).toHaveScreenshot(`homepage-${width}.png`, {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.005
    });
  });
}
