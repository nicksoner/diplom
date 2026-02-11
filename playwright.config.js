// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        version: '1.58.2',  // <- исправлено
        language: 'JavaScript'
      }
    }]
  ],
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
  {
    name: 'ui-tests',
    testDir: './tests/UI/specs',  // <- заглавные UI
    testMatch: '**/*.test.js',
    use: { 
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 },
    },
  },
  {
    name: 'api-tests',
    testDir: './tests/API/specs',  // <- заглавные API
    testMatch: '**/*.test.js',
    use: {
      baseURL: 'https://www.saucedemo.com',
      extraHTTPHeaders: {
        'Accept': 'application/json, text/html, application/xhtml+xml',
        'User-Agent': 'Diploma-Api-Tests/1.0 (Playwright)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      },
      screenshot: 'off',
      video: 'off',
      trace: 'off'
    },
  },
],
});