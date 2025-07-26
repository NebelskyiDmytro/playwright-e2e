import { faker } from '@faker-js/faker';
import { IUser } from '../types/types/user';

export class UserFactory {
  static create(overrides: Partial<IUser> = {}): IUser {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ...overrides,
    };
  }
}
