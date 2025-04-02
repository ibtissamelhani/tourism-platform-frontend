import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/constants';
import { UpdateUser, UserRequest, UserResponse } from '../models/User';
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${API_BASE_URL}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(
    page = 0,
    size = 10,
    sort = 'createdAt,desc'
  ): Observable<Page<UserResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
  
    return this.http.get<Page<UserResponse>>(this.apiUrl, { params });
  }

  getAllGuides(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/guides`);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/users`, user);
  }

  updateUser(id: string, updateUser: Partial<UpdateUser>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}`, updateUser);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}
