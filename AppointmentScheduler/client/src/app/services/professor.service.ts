import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfessorService {
  baseUrl = 'http://localhost:49495';
  constructor(private httpClient: HttpClient) {}
  getProfessorInfo(id) {
    return this.httpClient.get(`${this.baseUrl}/api/professor/${id}`);
  }

  updateProfessorPublicInfo(info) {
    return this.httpClient.put(
      `${this.baseUrl}/api/professor/${info.ID}`,
      info
    );
  }
}
