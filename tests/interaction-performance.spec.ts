import { expect, test } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`booking pill follows banners without waiting for scroll handlers at ${width}px`, async ({
    page
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.clock.install({ time: new Date('2026-11-16T16:00:00Z') });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.banner.promotion')).toBeVisible();
    await expect(page.locator('.banner.cookie')).toBeVisible();

    async function checkHandoff() {
      const samples = await page.evaluate(() => {
        const region = document.querySelector('.banner-region')!;
        const header = document.querySelector('header')!;
        const height = region.getBoundingClientRect().height;
        const gap = innerWidth <= 900 ? 12 : 20;
        const positions = [0, height / 3, height - 1, height, height + 80, height / 2, 0];

        return positions.map((top) => {
          window.scrollTo({ top, behavior: 'instant' });
          // Read in the same task, before JavaScript scroll listeners can run.
          const bannerBottom = region.getBoundingClientRect().bottom;
          return {
            actual: header.getBoundingClientRect().top,
            expected: Math.max(0, bannerBottom) + gap
          };
        });
      });

      for (const sample of samples) {
        expect(Math.abs(sample.actual - sample.expected)).toBeLessThan(1);
      }
    }

    await checkHandoff();
    await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
    await expect(page.locator('.banner.cookie')).toHaveCount(0);
    await checkHandoff();
    await page.getByRole('button', { name: /^Dismiss End of Year/ }).click();
    await expect(page.locator('.banner.promotion')).toHaveCount(0);
    await checkHandoff();
  });
}

test('service carousel starts when switching to mobile and handles repeated arrow taps', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#services');
  const viewport = page.locator('.services-viewport');
  await viewport.scrollIntoViewIfNeeded();
  await expect(viewport).not.toHaveAttribute('data-enhanced');

  await page.setViewportSize({ width: 390, height: 844 });
  const next = page.getByRole('button', { name: 'Next service', exact: true });
  const previous = page.getByRole('button', { name: 'Previous service', exact: true });
  await expect(next).toBeEnabled();

  for (let index = 0; index < 3; index += 1) {
    await next.click();
  }

  await expect(page.locator('.service-controls > span')).toHaveText('04 / 04');
  await expect(next).toBeDisabled();
  const viewportBox = await viewport.boundingBox();
  const lastCard = await page.locator('.service-card').last().boundingBox();
  expect(
    Math.abs(lastCard!.x + lastCard!.width - viewportBox!.x - viewportBox!.width)
  ).toBeLessThan(1);

  for (let index = 0; index < 3; index += 1) {
    await previous.click();
  }

  await expect(page.locator('.service-controls > span')).toHaveText('01 / 04');
  await expect(previous).toBeDisabled();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('.services-track')).toHaveCSS('transform', 'none');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(next).toBeEnabled();
  await next.click();
  await expect(page.locator('.service-controls > span')).toHaveText('02 / 04');

  await page.setViewportSize({ width: 768, height: 1000 });
  await next.click();
  await expect(page.locator('.service-controls > span')).toHaveText('03 / 04');
  await expect(next).toBeDisabled();
  await expect(previous).toBeEnabled();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(next).toBeEnabled();
  await next.click();
  await expect(page.locator('.service-controls > span')).toHaveText('04 / 04');
  await expect(next).toBeDisabled();
});
