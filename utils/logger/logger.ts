import chalk from 'chalk';
import { Page } from '@playwright/test';

export class Logger {
  static info(message: string) {
    console.log(chalk.blue(`[INFO]`), message);
  }

  static warn(message: string) {
    console.log(chalk.yellow(`[WARN]`), message);
  }

  static error(message: string) {
    console.log(chalk.red(`[ERROR]`), message);
  }

  static debug(message: string) {
    console.log(chalk.green(`[DEBUG]`), message);
  }

  static log(message: string) {
    console.log(chalk.cyan(`[LOG]`), message);
  }

  static navigation(url: string) {
    console.log(`[Navigation] URL: ${chalk.blue(url)}`);
  }

  static setupConsoleHandler(page: Page) {
    if (process.env.LOG_BROWSER_CONSOLE === 'true') {
      page.on('console', (msg) => {
        switch (msg.type()) {
          case 'error':
            Logger.error(msg.text());
            break;
          case 'warning':
            Logger.warn(msg.text());
            break;
          case 'info':
            Logger.info(msg.text());
            break;
          case 'debug':
            Logger.debug(msg.text());
            break;
          case 'log':
            Logger.log(msg.text());
            break;
        }
      });
    }
  }

  static setupPageErrorHandler(page: Page) {
    if (process.env.LOG_PAGE_ERROR === 'true') {
      page.on('pageerror', (exception) => {
        Logger.error(`Uncaught exception: "${exception}"`);
      });
    }
    if (process.env.THROW_PAGE_ERROR === 'true') {
      page.on('pageerror', (exception) => {
        throw new Error(`Uncaught exception: "${exception.message}"`);
      });
    }
  }

  static setupRequestFailedHandler(page: Page) {
    if (process.env.LOG_REQUEST_FAILED === 'true') {
      page.on('requestfailed', (request) => {
        Logger.error(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
      });
    }
  }
}
