import { IUser } from '../types/types/user';
import { DataGenerator } from '../utils/generators/dataGenerator';

export class UserFactory {
  static create(overrides: Partial<IUser> = {}): IUser {
    return {
      firstName: DataGenerator.generateRandomFirstName(),
      lastName: DataGenerator.generateRandomLastName(),
      ...overrides,
    };
  }
}
