import { Page } from '@playwright/test';
import { SamplePage } from './pages/samplePage';

export class PageManager {
  public readonly samplePage: SamplePage;

  constructor(private page: Page) {
    this.page = page;
    this.samplePage = new SamplePage(page);
  }
}
