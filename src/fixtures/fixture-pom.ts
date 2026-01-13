import { test as base } from '@playwright/test';
import { BasePage } from '../pom/BasePage';
import { PageManager } from '../pom/PageManager';
import { Logger } from '../utils/logger/logger';

export const test = base.extend<{
  pm: PageManager;
  page: BasePage;
  logger: Logger;
}>({
  // Here we are creating a new instance of PageManager in order to simplify access to the POM
  pm: [
    async ({ page }, use) => {
      const pm = new PageManager(page);
      await use(pm);
    },
    { auto: true },
  ],

  logger: [
    async ({ page }, use) => {
      // Here we are logging the browser console messages to the console
      Logger.setupConsoleHandler(page);
      Logger.setupPageErrorHandler(page);
      Logger.setupRequestFailedHandler(page);
      await use(Logger);
    },
    { auto: true },
  ],

  page: async ({ page }, use) => {
    await use(page);
  },
});

export { expect } from '@playwright/test';
