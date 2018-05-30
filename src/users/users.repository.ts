import { Patient } from './users.interfaces';

export class UsersRepository {
 
  public exists(id: number): boolean {
    return id > 0;
  }

  
  public getUser(id: number, defaultCountry: string): Patient {
    return {
      firstName: 'irfan',
      lastName: 'khattak',
      email: 'irfan@1eq.me',
      country: defaultCountry,
      id,
      name: 'Budapest',
      populationDensity: Math.random()
    };
  }

  /* istanbul ignore next Demo implementation. */
  // tslint:disable-next-line prefer-function-over-method (Demo implementation.)
  public hasAccess(id: number): boolean {
    return id !== 666;   // tslint:disable-line no-magic-numbers (Demo number.)
  }
  
}