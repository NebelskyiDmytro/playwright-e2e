import { IUser } from '../types/types/user.d';

export class UserBuilder {
  private user: Partial<IUser> = {};

  withFirstName(firstName: string): this {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.user.lastName = lastName;
    return this;
  }

  build(): IUser {
    return {
      firstName: this.user.firstName ?? '',
      lastName: this.user.lastName ?? '',
    };
  }
}
