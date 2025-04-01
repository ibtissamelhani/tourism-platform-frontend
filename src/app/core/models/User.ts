export interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'GUIDE';
    isActive?: boolean;
  }

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: 'ADMIN' | 'GUIDE' | 'TOURIST' | string; 
    active: boolean;
    createdAt: Date ; 
    updatedAt: Date; 
  }


  export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;     
    phoneNumber: string;
    role: 'ADMIN' | 'GUIDE' | 'TOURIST' | string;
    isActive: Boolean;
  }