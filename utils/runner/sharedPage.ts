import { Browser, Page, BrowserContext } from '@playwright/test';

let context: BrowserContext;
let sharedPage: Page;

export async function setupSharedPage(browser: Browser, url: string) {
  context = await browser.newContext();
  sharedPage = await context.newPage();
  await sharedPage.goto(url);
}

export function getSharedPage() {
  return sharedPage;
}

export async function teardownSharedPage() {
  await context.close();
}
