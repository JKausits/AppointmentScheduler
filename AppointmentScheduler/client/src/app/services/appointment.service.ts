import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AppointmentService {
  baseUrl = 'http://localhost:49495';
  constructor(private http: HttpClient) {}

  getProfessorAppointments(id) {
    return this.http.get(`${this.baseUrl}/api/appointment/professor/${id}`);
  }

  getWeeklyProfessorAppointments(id, currentWeek) {
    const params = new HttpParams().set(
      'currentWeek',
      currentWeek.toISOString().slice(0, 10)
    );

    return this.http.get(`${this.baseUrl}/api/appointment/professor/${id}`, {
      params
    });
  }

  scheduleAppointment(appointment) {
    return this.http.post(`${this.baseUrl}/api/Appointment`, appointment);
  }
}
