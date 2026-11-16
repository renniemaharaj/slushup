import { expect, test } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`portfolio visual regression at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(async () => {
      await document.fonts.ready;
      await document.querySelector<HTMLImageElement>('.portrait-frame img')?.decode();
    });
    await expect(page).toHaveScreenshot(`homepage-${width}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.001
    });
  });
}
