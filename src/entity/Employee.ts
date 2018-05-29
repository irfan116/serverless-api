export class Employee
{
    public id;

    public firstName;

    public lastName;

    public email;

    public role;

}

export interface GetEmployeeResult {
    employee: Employee;
  } 