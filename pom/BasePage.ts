import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string, option: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'networkidle'): Promise<void> {
    Logger.navigation(url);
    await this.page.goto(url, { waitUntil: option as 'load' | 'domcontentloaded' | 'networkidle' | 'commit' });
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
