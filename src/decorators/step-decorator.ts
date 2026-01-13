import { test } from '@playwright/test';

/**
 * A method decorator that wraps the decorated method in a test step.
 * Used to create structured test steps in Playwright test reports.
 * 
 * @param template - Optional template string for custom step name. Use {0}, {1} etc to reference method arguments
 * @returns A decorator function that wraps the method in a test.step()
 * 
 * @example
 * ```ts
 * class LoginPage {
 *   @step('Enter username {0}')
 *   async enterUsername(username: string) {
 *     // Method implementation
 *   }
 * }
 * ```
 */
function step(template?: string) {
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return async function replacementMethod(this: any, ...args: any[]) {
      const name = template ? template.replace(/\{(\d+)\}/g, (_, i) => args[+i]) : `[${this.constructor.name}] - ${context.name as string}`;

      return await test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}

export default step;
