import chalk from 'chalk';
import { Page } from '@playwright/test';
import { BrowseConsole, LogType } from '../../types/enums/logger';

export class Logger {
  private static logMessage(type: LogType, message: string, color: (text: string) => string, summary?: string) {
    if (summary) {
      console.log(color(`[${type}]`), summary, color(message));
    } else {
      console.log(color(`[${type}]`), message);
    }
  }

  static info(message: string, summary?: string) {
    Logger.logMessage(LogType.Info, message, chalk.blue, summary);
  }

  static warn(message: string, summary?: string) {
    Logger.logMessage(LogType.Warn, message, chalk.yellow, summary);
  }

  static error(message: string, summary?: string) {
    Logger.logMessage(LogType.Error, message, chalk.red, summary);
  }

  static errorPageError(message: string) {
    Logger.logMessage(LogType.Error, message, chalk.red, 'Page error:');
  }

  static errorRequestFailed(message: string) {
    Logger.logMessage(LogType.Error, message, chalk.red, 'Request failed:');
  }

  static debug(message: string, summary?: string) {
    Logger.logMessage(LogType.Debug, message, chalk.green, summary);
  }

  static log(message: string, summary?: string) {
    Logger.logMessage(LogType.Log, message, chalk.cyan, summary);
  }

  static navigation(url: string, summary?: string) {
    Logger.logMessage(LogType.Navigation, `URL: ${chalk.blue(url)}`, chalk.blue, summary);
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
        Logger.errorPageError(exception.message);
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
        Logger.errorRequestFailed(`${request.url()} - ${request.failure()?.errorText}`);
      });
    }
  }
}
