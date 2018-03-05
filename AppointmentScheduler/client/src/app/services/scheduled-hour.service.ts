import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduledHourService {
  baseUrl = 'http://localhost:49495';
  scheduledHours;
  constructor(private http: HttpClient) {}

  createScheduledHour(scheduledHour) {
    return this.http.post(`${this.baseUrl}/api/ScheduledHour`, scheduledHour);
  }

  getOfficeHourItems(id) {
    return this.http.get(`${this.baseUrl}/api/ScheduledHour/${id}`);
  }
}
