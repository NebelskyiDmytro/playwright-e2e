import { test as setup } from '@playwright/test';
import { DataGenerator } from './utils/generators/dataGenerator';
import { Logger } from './utils/logger/logger';

setup('Setup', async () => {
  const date = new Date();
  Logger.info(`Execution started at: ${DataGenerator.getFormattedDate(date)}`);
});
