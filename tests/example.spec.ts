import { test } from '../fixtures/fixture-pom';
import { DataGenerator } from '../utils/generators/dataGenerator';

test('has title', async ({ pm }) => {
  const name = DataGenerator.randomName();
  console.log(name);
});
