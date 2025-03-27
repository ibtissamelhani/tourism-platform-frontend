export interface PlaceResponse {
    id: string;
    name: string;
    address: string;
    city: string;
    type: PlaceType;
  }
  
  export interface PlaceType {
    id: string;
    name: string;
  }
  