import { IUser } from '../types/types/user.d';

const DEFAULT_USER: IUser = {
  firstName: 'John',
  lastName: 'Doe',
};

export class UserBuilder {
  private user: Partial<IUser> = {};

  setFirstName(firstName: string): this {
    this.user.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): this {
    this.user.lastName = lastName;
    return this;
  }

  build(): IUser {
    return {
      ...DEFAULT_USER,
      ...this.user,
    };
  }
}
