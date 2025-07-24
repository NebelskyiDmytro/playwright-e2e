import chalk from 'chalk';

export class Logger {
  static info(message: string) {
    console.log(chalk.blue(`[INFO]`), message);
  }

  static warn(message: string) {
    console.warn(chalk.yellow(`[WARN]`), message);
  }

  static error(message: string) {
    console.error(chalk.red(`[ERROR]`), message);
  }

  static debug(message: string) {
    console.debug(chalk.green(`[DEBUG]`), message);
  }
}
