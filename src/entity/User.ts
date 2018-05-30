export class User
{
    public id;
    public firstName;
    public lastName;
    public email;
    public role;
}

export interface GetUserResult {
    user: User;
  } 