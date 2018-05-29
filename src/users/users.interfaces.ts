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