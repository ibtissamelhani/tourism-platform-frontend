import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { PlaceResponse } from '../models/Place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

    private apiUrl = `${API_BASE_URL}/places`;
  
    constructor(private http: HttpClient) {}

    getAllPlaces(page = 0, size = 10): Observable<Page<PlaceResponse>> {
      return this.http.get<Page<PlaceResponse>>( this.apiUrl, {
        params: { page, size }
      });
    }
    
}
