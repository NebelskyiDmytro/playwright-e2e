import { test as base } from '@playwright/test';
import { BasePage } from '../pom/BasePage';
import { PageManager } from '../pom/PageManager';
import { Logger } from '../utils/logger/logger';

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
    if (process.env.LOG_CONSOLE === 'true') {
      page.on('console', (msg) => {
        switch (msg.type()) {
          case 'error':
            Logger.error(msg.text());
            break;
          case 'warning':
            Logger.warn(msg.text());
            break;
          case 'info':
            Logger.info(msg.text());
            break;
          case 'debug':
            Logger.debug(msg.text());
            break;
          case 'log':
            Logger.log(msg.text());
            break;
        }
      });
    }
    await use(page);
  },
});

export { expect } from '@playwright/test';
