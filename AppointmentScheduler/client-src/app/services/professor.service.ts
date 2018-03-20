import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class ProfessorService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
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

  updateProfessorPrivateInfo(professor) {
    return this.httpClient.put(
      `${this.baseUrl}/api/professor/private/${professor.id}`,
      professor,
      {
        headers: this.auth.getAuthHeader()
      }
    );
  }

  resetPassword(id, password) {
    return this.httpClient.put(
      `${this.baseUrl}/api/professor/password/${id}?password=${password}`,
      '',
      {
        headers: this.auth.getAuthHeader()
      }
    );
  }

  getActiveProfessors() {
    return this.httpClient.get(`${this.baseUrl}/api/professor/active`);
  }

  getProfessors() {
    return this.httpClient.get(`${this.baseUrl}/api/professor/`, {
      headers: this.auth.getAuthHeader()
    });
  }
}
