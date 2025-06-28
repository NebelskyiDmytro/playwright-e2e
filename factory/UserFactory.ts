import { faker } from '@faker-js/faker';
import { IUser } from '../types/user';

export class UserFactory {
  static create(overrides: Partial<IUser> = {}): IUser {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      ...overrides,
    };
  }
}
