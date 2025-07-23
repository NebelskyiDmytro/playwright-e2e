import { expect, Locator, Page } from '@playwright/test';
import chalk from 'chalk';
import { TIMEOUTS } from '../config/timeouts';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageReady(timeout: number = TIMEOUTS.PAGE_LOAD, waitForIdle: boolean = false): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    if (waitForIdle) {
      await this.page.waitForLoadState('networkidle', { timeout });
    }
  }

  async navigateTo(url: string, waitForIdle: boolean = false): Promise<void> {
    console.log(`[Navigation] Opening URL: ${chalk.blue(url)}`);
    await this.page.goto(url);
    await this.waitForPageReady(TIMEOUTS.PAGE_LOAD, waitForIdle);
  }

  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async assertTextVisible(text: string, exact: boolean = true): Promise<void> {
    await expect(this.page.getByText(text, { exact })).toBeVisible();
  }

  async assertUrlContains(partial: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partial));
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }
}
