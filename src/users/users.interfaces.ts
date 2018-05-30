export interface Patient {
    firstName: string;
    lastName: string;
    email: String;
    country: string;
    id: number;
    name: string;
    populationDensity: number;
  }
  
  export interface GetPatientResult {
    patient: Patient;
  }

  interface CreateUserRequest
    {
        firstName:string;
        lastName:string;
        email:string;
        role:string;
    }

     