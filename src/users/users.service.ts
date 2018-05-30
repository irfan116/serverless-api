import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { Patient, GetPatientResult } from './users.interfaces';
import { UsersRepository } from './users.repository';
import { DbContext } from '../common/DbContext';
import { parseJson } from '../common/Common';
import { User } from '../entity/User';
import * as uuid from 'uuid';

export class UsersService {
  dbContext: DbContext;
  public constructor(private _repo: UsersRepository, private _env: NodeJS.ProcessEnv) {
    this.dbContext = new DbContext();
  }

  public getUser(id: number): Promise<GetPatientResult> {
    return new Promise((resolve: (result: GetPatientResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_USER', 'There is no user with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the city with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const patient: Patient = this._repo.getUser(id, defaultCountry);
      const result: GetPatientResult = {
        patient
      };

      resolve(result);
    });
  }

  public creatUser(body:string):Promise<User>{
    let req = parseJson(body);
    let user = new User();
        user.id = uuid.v4();
        user.firstName = req.firstName;
        user.lastName = req.lastName;
        user.role = req.role
        user.email = req.email;

    return this.dbContext.put('user',user).then(() =>{
      return user;
    });
    
  }

  
}