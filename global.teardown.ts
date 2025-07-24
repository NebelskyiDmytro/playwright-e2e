import { test as teardown } from '@playwright/test';
import { DataGenerator } from './utils/generators/dataGenerator';
import { Logger } from './utils/logger/logger';

teardown('Teardown', async () => {
  const date = new Date();
  Logger.info(`Execution ended at: ${DataGenerator.getFormattedDate(date)}`);
});
