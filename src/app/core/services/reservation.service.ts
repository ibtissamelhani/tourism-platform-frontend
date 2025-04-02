import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { ReservationRequest, ReservationResponse } from '../models/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${API_BASE_URL}/reservations`;

  constructor(private http: HttpClient) { }

  createReservation(reservationRequest: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.apiUrl, reservationRequest);
  }

  getReservationById(id: string): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.apiUrl}/${id}`);
  }

  getMyReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/my-reservations`);
  }

  cancelReservation(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/cancel`, {});
  }

}
