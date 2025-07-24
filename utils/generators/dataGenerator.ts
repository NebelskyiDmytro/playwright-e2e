import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateRandomFirstName(): string {
    return faker.person.firstName();
  }

  static generateRandomLastName(): string {
    return faker.person.lastName();
  }

  static generateRandomFullName(): string {
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
  }

  static generateRandomEmail(test?: boolean): string {
    if (test) {
      const username = faker.internet
        .username()
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
      return `${username}@test.com`;
    }
    return faker.internet.email();
  }

  static generateRandomNumber(min: number = 0, max: number = 100): number {
    return faker.number.int({ min, max });
  }

  static generateRandomPassword(length: number = 10): string {
    return faker.string.alphanumeric({ length });
  }

  static generateDate(): string {
    return faker.date.recent().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}
