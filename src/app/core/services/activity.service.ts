import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { ActivityRequest, ActivityResponse } from '../models/Activity';

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

  createActivity(activityRequest: ActivityRequest): Observable<ActivityResponse> {
    return this.http.post<ActivityResponse>(this.apiUrl, activityRequest);
  }

  deleteActivity(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ responseType: 'text' });
  }

  updateActivity(id: string, activityData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, activityData);
  }
  getActivityById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
