import chalk from 'chalk';
import { Page } from '@playwright/test';
import { BrowseConsole, LogType } from '../../types/enums/logger';

export class Logger {
  static info(message: string) {
    console.log(chalk.blue(`[${LogType.Info}]`), message);
  }

  static warn(message: string) {
    console.log(chalk.yellow(`[${LogType.Warn}]`), message);
  }

  static error(message: string) {
    console.log(chalk.red(`[${LogType.Error}]`), message);
  }

  static error_page_error(message: string) {
    console.log(chalk.red(`[${LogType.Error}] Page error: ${message}`));
  }

  static error_request_failed(message: string) {
    console.log(chalk.red(`[${LogType.Error}] Request failed: ${message}`));
  }

  static debug(message: string) {
    console.log(chalk.green(`[${LogType.Debug}]`), message);
  }

  static log(message: string) {
    console.log(chalk.cyan(`[${LogType.Log}]`), message);
  }

  static navigation(url: string) {
    console.log(`[${LogType.Navigation}] URL: ${chalk.blue(url)}`);
  }

  /*
   * @description Logs the browser console event
   * @param page - The page object
   */
  static setupConsoleHandler(page: Page) {
    if (process.env.LOG_BROWSER_CONSOLE === 'true') {
      page.on('console', (msg) => {
        switch (msg.type()) {
          case BrowseConsole.Error:
            Logger.error(msg.text());
            break;
          case BrowseConsole.Warning:
            Logger.warn(msg.text());
            break;
          case BrowseConsole.Info:
            Logger.info(msg.text());
            break;
          case BrowseConsole.Debug:
            Logger.debug(msg.text());
            break;
          case BrowseConsole.Log:
            Logger.log(msg.text());
            break;
        }
      });
    }
  }

  /*
   * @description Logs the page error event
   * If the environment variable LOG_PAGE_ERROR is set to true, the page error event will be logged.
   * If the environment variable THROW_PAGE_ERROR is set to true, the page error event will be thrown.
   * @param page - The page object
   */
  static setupPageErrorHandler(page: Page) {
    if (process.env.LOG_PAGE_ERROR === 'true') {
      page.on('pageerror', (exception) => {
        Logger.error_page_error(exception.message);
      });
    }
    if (process.env.THROW_ON_PAGE_ERROR === 'true') {
      page.on('pageerror', (exception) => {
        throw new Error(`Uncaught exception: "${exception.message}"`);
      });
    }
  }

  /*
   * @description Logs the request failed event
   * @param page - The page object
   */
  static setupRequestFailedHandler(page: Page) {
    if (process.env.LOG_REQUEST_FAILED === 'true') {
      page.on('requestfailed', (request) => {
        Logger.error_request_failed(`${request.url()} - ${request.failure()?.errorText}`);
      });
    }
  }
}
