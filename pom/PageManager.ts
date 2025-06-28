import { Page } from "@playwright/test";

export class PageManager {
  constructor(private page: Page) {
    this.page = page;
  }
}
