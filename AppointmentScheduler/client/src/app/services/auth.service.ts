import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:49495';
  constructor(private httpClient: HttpClient) {}

  register(email, password) {
    return this.httpClient.post(`${this.baseUrl}/api/professor`, {
      email,
      password
    });
  }
}
