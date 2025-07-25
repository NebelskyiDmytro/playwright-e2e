import { Page } from '@playwright/test';
import { SamplePage } from './pages/samplePage';

export class PageManager {
  readonly page: Page;
  readonly samplePage: SamplePage;

  constructor(page: Page) {
    this.page = page;
    this.samplePage = new SamplePage(page);
  }
}
