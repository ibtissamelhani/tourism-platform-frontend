import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { ActivityResponse } from '../models/Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService{
  private apiUrl = `${API_BASE_URL}/activities`;

  constructor(private http: HttpClient) {}

  getActivities(
    page: number = 0, 
    size: number = 10, 
    sort: string = 'date,desc'
  ): Observable<Page<ActivityResponse>> {
    return this.http.get<Page<ActivityResponse>>(this.apiUrl, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sort: sort
      }
    });
  }
}
