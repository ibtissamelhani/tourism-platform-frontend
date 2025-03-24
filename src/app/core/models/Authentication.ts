export interface AuthenticationRequest {
    email: string;
    password: string;
  }
  
export  interface AuthenticationResponse {
    token: string;
  }

  export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }

  