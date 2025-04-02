import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReservationRequest, ReservationResponse } from '../models/Reservation';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';

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

  getAllReservations(page: number = 0, size: number = 10, sort: string = 'createdAt,asc'): Observable<Page<ReservationResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    return this.http.get<Page<ReservationResponse>>(this.apiUrl, { params });
  }

}
