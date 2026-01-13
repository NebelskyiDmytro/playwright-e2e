import { BasePage } from '../BasePage';

export class SamplePage extends BasePage {
  async goto() {
    await this.navigateTo('/');
  }
}
