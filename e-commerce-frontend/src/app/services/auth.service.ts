import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; // Change to your backend URL
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, data);
  }

  signup(data: { userName: string; email: string; password: string; phone_number: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, data);
  }

  verifyEmail(data: { email: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/verify-email`, data);
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, data);
  }

  resetPassword(data: { email: string; resetCode: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, data);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
} 