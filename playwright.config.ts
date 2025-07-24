import { defineConfig, devices } from '@playwright/test';

require('dotenv').config({ path: '.env', quiet: true });

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',

  expect: {
    timeout: 5000,

    toHaveScreenshot: {
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      maxDiffPixelRatio: 0.1,
    },
  },

  use: {
    // baseURL: 'http://localhost:3000',
    headless: process.env.HEADLESS === 'true' ? true : false,
    trace: 'on',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
});
