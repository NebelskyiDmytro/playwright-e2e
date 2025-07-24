import { expect, Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../config/timeouts';
import { Logger } from '../utils/logger/logger';

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
    Logger.navigation(url);
    await this.page.goto(url);
    await this.waitForPageReady(TIMEOUTS.PAGE_LOAD, waitForIdle);
  }

  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async assertTextVisible(text: string, exact: boolean = true): Promise<void> {
    try {
      await expect(this.page.getByText(text, { exact })).toBeVisible();
    } catch (error) {
      Logger.error(`Text not visible: ${text}`);
      throw error;
    }
  }

  async assertElementContainsText(locator: Locator, text: string): Promise<void> {
    try {
      await expect(locator).toContainText(text);
    } catch (error) {
      Logger.error(`Element does not contain text: ${text}`);
      throw error;
    }
  }

  async assertUrlContains(partial: string): Promise<void> {
    try {
      await expect(this.page).toHaveURL(new RegExp(partial));
    } catch (error) {
      Logger.error(`URL does not contain: ${partial}`);
      throw error;
    }
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }
}
