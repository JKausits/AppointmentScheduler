import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:49495';
  token: string;
  constructor(private httpClient: HttpClient) {}

  register(email, password) {
    return this.httpClient.post(`${this.baseUrl}/api/professor`, {
      email,
      password
    });
  }

  login(email, password) {
    return this.httpClient.post(`${this.baseUrl}/api/authentication`, {
      email,
      password
    });
  }

  logout(): void {
    window.sessionStorage.removeItem('token');
    window.localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    this.token =
      window.sessionStorage.getItem('token') ||
      window.localStorage.getItem('token');

    return this.token != null;
  }

  isAdmin() {
    return this.getTokenData().admin === 'True';
  }

  getTokenData() {
    this.token =
      window.sessionStorage.getItem('token') ||
      window.localStorage.getItem('token');
    const jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(this.token);
  }

  getAuthHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${window.localStorage.getItem('token') ||
        window.sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  }
}
