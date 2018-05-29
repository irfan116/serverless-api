export interface User {
    firstName: string;
    lastName: string;
    email: String;
    country: string;
    id: number;
    name: string;
    populationDensity: number;
  }
  
  export interface GetUserResult {
    user: User;
  }

  interface CreateEmployeeRequest
    {
        firstName:string;
        lastName:string;
        email:string;
        role:string;
    }

     