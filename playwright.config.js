// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        version: '1.40.0',
        language: 'JavaScript'
      }
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/') */
    baseURL: 'https://www.saucedemo.com',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui-tests',
      testDir: './tests/ui/specs',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Базовые настройки уже наследуются из use выше
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api/specs',
      use: {
        baseURL: 'https://www.saucedemo.com',
        extraHTTPHeaders: {
          'Accept': 'application/json, text/html, application/xhtml+xml',
          'User-Agent': 'Diploma-Api-Tests/1.0 (Playwright)',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        },
        // Для API тестов отключаем ненужные для UI настройки
        screenshot: 'off',
        video: 'off',
        trace: 'off'
      },
    },
  ],
});