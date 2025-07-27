import { expect, test } from '@playwright/test';

test('Simple API test', async ({ request }) => {
  const response = await request.get('/');
  expect(response).toBeOK();
});
