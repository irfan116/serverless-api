import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { User, GetUserResult } from './users.interfaces';
import { UsersRepository } from './users.repository';

export class UsersService {
  public constructor(private _repo: UsersRepository, private _env: NodeJS.ProcessEnv) {
  }

  public getUser(id: number): Promise<GetUserResult> {
    return new Promise((resolve: (result: GetUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_CITY', 'There is no user with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the city with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const user: User = this._repo.getUser(id, defaultCountry);
      const result: GetUserResult = {
        user
      };

      resolve(result);
    });
  }
}