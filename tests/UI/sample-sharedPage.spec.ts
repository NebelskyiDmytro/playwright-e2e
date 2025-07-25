import { test, expect, Page } from '@playwright/test';
import { setupSharedPage, teardownSharedPage, getSharedPage } from '../../utils/runner/sharedPage';

let page: Page;
const socials = ['linkedin', 'google', 'github'];

test.beforeAll(async ({ browser }) => {
  await setupSharedPage(browser, 'https://djinni.co/login');
  page = getSharedPage();
});

test.afterAll(async () => {
  await teardownSharedPage();
});

test.skip('Login page', () => {
  test('Verify email field', async () => {
    await expect(page.locator('#email')).toBeVisible();
    await page.locator('#email').fill('test@test.com');
  });

  test('Verify password field', async () => {
    await expect(page.locator('#password')).toBeVisible();
    await page.locator('#password').fill('test@test.com');
  });

  test('Verify title', async () => {
    const title = await page.title();
    expect(title).toBe('Log In to Djinni'.trim());
  });

  test('Verify header text', async () => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Log In to Djinni');
  });

  socials.forEach((social) => {
    test(`Verify login '${social}' button is visible`, async () => {
      await expect(page.locator(`//button[@type='submit' and @value='${social}']`)).toBeVisible();
    });
  });
});
