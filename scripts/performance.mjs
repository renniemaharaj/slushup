import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
const directory = process.env.AUDIT_DIRECTORY || 'docs/audit/after';
await mkdir(directory, { recursive: true });
const summary = {};

// Run serially: competing browser audits distort CPU measurements.
for (const mode of ['mobile', 'desktop']) {
  const chrome = await launch({
    chromePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/usr/bin/chromium',
    chromeFlags: ['--headless', '--no-sandbox']
  });
  try {
    const result = await lighthouse(
      url,
      {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      },
      mode === 'desktop' ? desktopConfig : undefined
    );

    if (!result) {
      throw new Error(`No Lighthouse result for ${mode}`);
    }

    if (result.lhr.runtimeError) {
      throw new Error(result.lhr.runtimeError.message);
    }

    await writeFile(`${directory}/lighthouse-${mode}.json`, result.report);
    summary[mode] = {
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, category]) => [
          key,
          Math.round(category.score * 100)
        ])
      ),
      formFactor: result.lhr.configSettings.formFactor,
      lcp: result.lhr.audits['largest-contentful-paint'].displayValue,
      cls: result.lhr.audits['cumulative-layout-shift'].displayValue,
      tbt: result.lhr.audits['total-blocking-time'].displayValue
    };
  } finally {
    await chrome.kill();
  }
}

await writeFile(`${directory}/performance-summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
