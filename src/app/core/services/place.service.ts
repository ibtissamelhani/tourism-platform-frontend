import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { PlaceRequest, PlaceResponse, PlaceType } from '../models/Place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

    private apiUrl = `${API_BASE_URL}/places`;
    private apiUrlTypes = `${API_BASE_URL}/types`;
  
    constructor(private http: HttpClient) {}

    getAllPlaces(page = 0, size = 10): Observable<Page<PlaceResponse>> {
      return this.http.get<Page<PlaceResponse>>( this.apiUrl, {
        params: { page, size }
      });
    }

    createPlace(placeRequest: PlaceRequest): Observable<PlaceResponse> {
      return this.http.post<PlaceResponse>(this.apiUrl, placeRequest);
    }

    getAllTypes(): Observable<PlaceType[]> {
      return this.http.get<PlaceType[]>(this.apiUrlTypes);
    }

    deletePlace(id: string) {
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    getPlaceById(id: string): Observable<PlaceResponse> {
      return this.http.get<PlaceResponse>(`${this.apiUrl}/${id}`);
    }

    updatePlace(id: string, placeRequest: PlaceRequest): Observable<PlaceResponse> {
      return this.http.put<PlaceResponse>(`${this.apiUrl}/${id}`, placeRequest);
    }

    
}
