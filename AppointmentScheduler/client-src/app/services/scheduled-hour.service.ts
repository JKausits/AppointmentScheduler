import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class ScheduledHourService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private auth: AuthService) {}

  createScheduledHour(scheduledHour) {
    return this.http.post(`${this.baseUrl}/api/ScheduledHour`, scheduledHour, {
      headers: this.auth.getAuthHeader()
    });
  }

  getOfficeHourItems(id) {
    return this.http.get(`${this.baseUrl}/api/ScheduledHour/${id}`, {
      headers: this.auth.getAuthHeader()
    });
  }

  deleteScheduledHour(id) {
    return this.http.delete(`${this.baseUrl}/api/ScheduledHour/${id}`, {
      headers: this.auth.getAuthHeader()
    });
  }
}
