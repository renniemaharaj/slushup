import { expect, test, type Page } from '@playwright/test';

async function recordScroll(page: Page, duration: number) {
  return page.evaluate(async (milliseconds) => {
    const positions: number[] = [];
    const started = performance.now();

    await new Promise<void>((resolve) => {
      function sample() {
        positions.push(window.scrollY);
        if (performance.now() - started >= milliseconds) {
          resolve();
          return;
        }

        requestAnimationFrame(sample);
      }

      requestAnimationFrame(sample);
    });

    return positions;
  }, duration);
}

test('wheel scrolling stays in direction when crossing services and occasions', async ({
  page
}) => {
  await page.goto('/#services');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  // Bring the lazy carousel into view before checking scrolling across both sections.
  await page.locator('.occasions-viewport').scrollIntoViewIfNeeded();
  await expect(page.locator('.occasions-viewport')).toHaveAttribute('data-enhanced', 'true');
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  for (const direction of [1, -1]) {
    await page.evaluate(() => {
      const state = window as Window & { scrollSamples?: number[]; scrollFrame?: number };
      state.scrollSamples = [];

      function sample() {
        state.scrollSamples!.push(window.scrollY);
        state.scrollFrame = requestAnimationFrame(sample);
      }

      state.scrollFrame = requestAnimationFrame(sample);
    });
    for (let index = 0; index < 12; index += 1) {
      // Cross carousel cards and plain section space while inertia is still active.
      await page.mouse.move(700, index % 2 ? 200 : 850);
      await page.mouse.wheel(0, direction * 180);
      await page.waitForTimeout(160);
    }

    await page.waitForTimeout(1200);
    const positions = await page.evaluate(() => {
      const state = window as Window & { scrollSamples?: number[]; scrollFrame?: number };
      cancelAnimationFrame(state.scrollFrame!);
      return state.scrollSamples!;
    });
    const steps = positions.slice(1).map((position, index) => position - positions[index]);
    expect(Math.min(...steps.map((step) => step * direction))).toBeGreaterThanOrEqual(-2);
    expect((positions.at(-1)! - positions[0]) * direction).toBeGreaterThan(1200);
  }
});

test('anchor navigation cancels wheel inertia and settles below the fixed header', async ({
  page
}) => {
  await page.goto('/#services');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 600);
  await page.locator('header').getByRole('link', { name: 'Occasions', exact: true }).click();
  await expect(page).toHaveURL(/#occasions$/);
  await expect
    .poll(async () =>
      page.locator('#occasions').evaluate((node) => node.getBoundingClientRect().top)
    )
    .toBeCloseTo(112, 0);
  const positions = await recordScroll(page, 1200);
  expect(Math.max(...positions) - Math.min(...positions)).toBeLessThanOrEqual(2);
  await expect(page.getByRole('heading', { name: /Here's to/ })).toBeInViewport();
});
