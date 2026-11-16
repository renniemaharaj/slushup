import { defineConfig } from '@playwright/test';

const browserName =
  process.env.PLAYWRIGHT_BROWSER === 'firefox'
    ? 'firefox'
    : process.env.PLAYWRIGHT_BROWSER === 'webkit'
      ? 'webkit'
      : 'chromium';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    browserName,
    baseURL: 'http://127.0.0.1:4174',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions:
      browserName === 'chromium'
        ? {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/usr/bin/chromium',
            args: ['--no-sandbox']
          }
        : undefined
  },
  webServer: {
    command: 'npm run preview -- --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: !process.env.CI
  }
});
