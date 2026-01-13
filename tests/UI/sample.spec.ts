import { expect, test } from '../../src/fixtures/fixture-pom';

test('Simple UI test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
