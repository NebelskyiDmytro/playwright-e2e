import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageReady(
    timeout: number = 10000,
    waitForIdle: boolean = false
  ): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded", { timeout });
    if (waitForIdle) {
      await this.page.waitForLoadState("networkidle", { timeout });
    }
  }

  async navigateTo(url: string, waitForIdle: boolean = false): Promise<void> {
    console.log(`[Navigation] Going to ${url}`);
    await this.page.goto(url);
    await this.waitForPageReady(10000, waitForIdle);
  }

  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async assertTextVisible(text: string): Promise<void> {
    await expect(this.page.getByText(text, { exact: true })).toBeVisible();
  }

  async assertUrlContains(partial: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partial));
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }
}
