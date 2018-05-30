import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { User, GetUserResult } from './users.interfaces';
import { UsersRepository } from './users.repository';
import { DbContext } from '../common/DbContext';
import { parseJson } from '../common/Common';
import { Employee } from '../entity/Employee';
import * as uuid from 'uuid';

export class UsersService {
  dbContext: DbContext;
  public constructor(private _repo: UsersRepository, private _env: NodeJS.ProcessEnv) {
    this.dbContext = new DbContext();
  }

  public getUser(id: number): Promise<GetUserResult> {
    return new Promise((resolve: (result: GetUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_USER', 'There is no user with the specified ID!'));
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

  public creatEmploee(body:string):Promise<Employee>{
    let req = parseJson(body);
    let employee = new Employee();
        employee.id = uuid.v4();
        employee.firstName = req.firstName;
        employee.lastName = req.lastName;
        employee.role = req.role
        employee.email = req.email;

    return this.dbContext.put('user',employee).then(() =>{
      return employee;
    });
    
  }

  
}