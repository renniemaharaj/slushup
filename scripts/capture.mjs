import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
const directory = 'docs/audit/after';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox']
});
const diagnostics = [];

for (const [name, width, height] of [
  ['mobile', 390, 844],
  ['tablet', 768, 1024],
  ['desktop', 1440, 1000]
]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(origin, { waitUntil: 'networkidle' });
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
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await section
      .locator('img')
      .evaluateAll((images) => Promise.all(images.map((image) => image.decode().catch(() => {}))));
    await page.waitForTimeout(150);
    // Section captures exclude floating navigation that belongs to the viewport.
    await section.screenshot({
      path: `${directory}/${name}-${id}.jpg`,
      quality: 88,
      style: id === 'hero' ? undefined : 'header, .skip-link { opacity: 0 !important; }'
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${directory}/${name}.jpg`, fullPage: true, quality: 88 });
  diagnostics.push({
    name,
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    images: await page.locator('img').evaluateAll((images) =>
      images.map((image) => ({
        src: image.currentSrc,
        width: image.naturalWidth,
        loaded: image.complete
      }))
    )
  });
  await page.close();
}

await writeFile(`${directory}/browser-diagnostics.json`, JSON.stringify(diagnostics, null, 2));
await browser.close();
console.log(`Screenshots saved in ${directory}`);
