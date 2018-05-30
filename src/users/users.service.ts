import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { Patient, GetPatientResult } from './users.interfaces';
import { UsersRepository } from './users.repository';
import { DbContext } from '../common/DbContext';
import { parseJson } from '../common/Common';
import { User } from '../entity/User';
import { GetUserResult } from '../entity/User'
import * as uuid from 'uuid';


export class UsersService {
  dbContext: DbContext;
  public constructor(private _repo: UsersRepository, private _env: NodeJS.ProcessEnv) {
    this.dbContext = new DbContext();
  }

  public get(page='1', limit='10', search){
    return this.dbContext.query<User>({
      TableName: 'user'
  });

  }

  public getUserById(id){
    return this.dbContext.query<User>({
      TableName: 'user'
  }).then((users)=> users[0]);

  }

  public getUser(id: number): Promise<User> {
    return new Promise((resolve: (result: User) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_USER', 'There is no user with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the user with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';      
      this.getUserById(id).then((user)=>{

        resolve(user);

      });//this._repo.getUser(id, defaultCountry);
   
      
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