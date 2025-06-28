import { expect, test } from '../../fixtures/fixture-pom';

test('Simple test', async ({ page }) => {
  await page.goto('playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
