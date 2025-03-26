export interface ActivityResponse {
    id: string; 
    name: string;
    description: string;
    capacity: number;
    price: number;
    date: Date; 
    registrationDeadline: Date; 
    availability: boolean;
    category: string;
    status: ActivityStatus;
    place: string;
    guideFirstName: string;
    guideLastName: string;
    guideEmail: string;
    imageUrls: string[];
  }
  
  export type ActivityStatus = 'ACTIVE' | 'CANCELED' ; 
  