import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
import { Page } from '../models/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${API_BASE_URL}/categories`;

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<Page<Category>> {
    return this.http.get<Page<Category>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createCategory(category: { name: string }) {
    return this.http.post<Category>(`${this.apiUrl}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
