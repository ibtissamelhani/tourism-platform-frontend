import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {jwtDecode} from "jwt-decode";
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest } from '../models/Authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${API_BASE_URL}/auth`;
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, credentials)
      .pipe(
        tap((response: AuthenticationResponse) => {
          if (response && response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/register`, registerRequest)
      .pipe(
        tap((response: any) => {
         console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        console.warn('Token expired, logging out');
        this.logout();
        return null;
      }
      
      if (decodedToken.role) {
        return decodedToken.role;
      } else if (decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
        return decodedToken.roles[0];
      } else if (decodedToken.authorities && Array.isArray(decodedToken.authorities)) {
        return decodedToken.authorities[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decodedToken: any = jwtDecode(token);
      return !(decodedToken.exp && decodedToken.exp * 1000 < Date.now());
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);  
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.status === 0) {
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else if (error.status === 401) {
      errorMessage = 'Invalid email or password. Please check your credentials.';
    } else if (error.status === 403) {
      errorMessage = 'You do not have permission to access this resource.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    
    console.error('Authentication error:', error);
    return throwError(() => new Error(errorMessage));
  }


  getCurrentUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
}
