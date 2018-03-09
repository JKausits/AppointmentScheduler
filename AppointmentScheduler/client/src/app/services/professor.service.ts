import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfessorService {
  baseUrl = 'http://localhost:49495';
  constructor(private httpClient: HttpClient) {}
  getProfessorInfo(id) {
    return this.httpClient.get(`${this.baseUrl}/api/professor/${id}`);
  }

  updateProfessorPublicInfo(info) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${window.localStorage.getItem('token') ||
        window.sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(
      `${this.baseUrl}/api/professor/${info.ID}`,
      info,
      {
        headers
      }
    );
  }

  getActiveProfessors() {
    return this.httpClient.get(`${this.baseUrl}/api/professor/active`);
  }

  getProfessors() {
    return this.httpClient.get(`${this.baseUrl}/api/professor/`);
  }
}
