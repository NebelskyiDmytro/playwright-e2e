import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env-examle', quiet: true });

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [['allure-playwright'], ['html']],

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
    headless: process.env.CI ? true : false,
    trace: 'on',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: 'global.setup.ts',
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testDir: './',
      testMatch: 'global.teardown.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
});
