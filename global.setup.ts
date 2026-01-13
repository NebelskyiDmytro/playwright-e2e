import { test as setup } from '@playwright/test';
import { DataGenerator } from './src/utils/generators/dataGenerator';
import { Logger } from './src/utils/logger/logger';

setup('Setup', async () => {
  const date = new Date();
  Logger.info(`Execution started at: ${DataGenerator.getFormattedDate(date)}`);
});
