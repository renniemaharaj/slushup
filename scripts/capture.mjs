import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox']
});
await mkdir('artifacts/screenshots', { recursive: true });

try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce'
    });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4181', {
      waitUntil: 'networkidle'
    });
    await page.evaluate(() => document.fonts.ready);
    for (const picture of await page.locator('img').all()) {
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate((image) => image.decode());
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `artifacts/screenshots/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `artifacts/screenshots/hero-${width}.png` });
    await page.close();
  }
} finally {
  await browser.close();
}
