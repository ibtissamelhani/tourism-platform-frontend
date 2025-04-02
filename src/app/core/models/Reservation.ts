export interface ReservationRequest {
    activityId: string;
    numberOfParticipants: number;
    reservationDate: string; 
    state: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  }

  export interface ReservationResponse {
    id: string;
    userFirstName: string;
    userLastName: string;
    activity: string;
    numberOfParticipants: number;
    totalPrice: number;
    reservationDate: string; 
    state: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
    createdAt: string;
    updatedAt: string;
    clientSecret: string;
  }
  