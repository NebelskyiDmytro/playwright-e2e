import { test as base } from '@playwright/test';
import { BasePage } from '../pom/BasePage';
import { PageManager } from '../pom/PageManager';

export const test = base.extend<{
  pm: PageManager;
  page: BasePage;
}>({
  pm: [
    async ({ page }, use) => {
      const pm = new PageManager(page);
      await use(pm);
    },
    { auto: true },
  ],

  page: async ({ page }, use) => {
    await use(page);
  },
});

export { expect } from '@playwright/test';
