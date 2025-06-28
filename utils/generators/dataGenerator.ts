import { faker } from '@faker-js/faker';

export class DataGenerator {
  static randomFirstName(): string {
    return faker.person.firstName();
  }

  static randomLastName(): string {
    return faker.person.lastName();
  }

  static randomFullName(): string {
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
  }

  static randomEmail(test?: boolean): string {
    if (test) {
      const username = faker.internet
        .username()
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
      return `${username}@test.com`;
    }
    return faker.internet.email();
  }

  static randomNumber(min: number = 0, max: number = 100): number {
    return faker.number.int({ min, max });
  }

  static password(length: number = 10): string {
    return faker.string.alphanumeric({ length });
  }
}
