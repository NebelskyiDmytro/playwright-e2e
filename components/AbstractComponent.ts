import { Page } from '@playwright/test';

export class AbstractComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async action() {
    // TODO: Action steps
  }
}
