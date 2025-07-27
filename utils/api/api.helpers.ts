import { APIRequestContext } from '@playwright/test';
import { TimedResponse } from '../../types/types/api';

/**
 * Sends a request and measures its execution time
 * @param request Playwright APIRequestContext
 * @param url Request URL
 * @param options Request options (method, headers, etc)
 * @returns Object containing response and request duration in milliseconds
 *
 * @example
 * ```typescript
 * const { response, duration } = await sendTimedRequest(
 *   request,
 *   'https://api.example.com/users',
 *   { method: 'GET', headers: { 'Authorization': 'Bearer token' } }
 * );
 * console.log(`Request took ${duration}ms`);
 * console.log(`Status: ${response.status()}`);
 * ```
 */
export async function sendTimedRequest(
  request: APIRequestContext,
  url: string,
  options?: Parameters<APIRequestContext['fetch']>[1],
): Promise<TimedResponse> {
  const startTime = performance.now();
  const response = await request.fetch(url, options);
  const endTime = performance.now();

  return {
    response,
    duration: Number((endTime - startTime).toFixed(2)),
  };
}
