import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AppointmentService {
  baseUrl = 'http://localhost:49495';
  constructor(private http: HttpClient) {}

  getProfessorAppointments(id) {
    return this.http.get(`${this.baseUrl}/api/appointment/professor/${id}`);
  }

  getPendingOrScheduleProfessorAppointmentsAfterThisWeek(id) {
    const date = new Date();

    return this.http.get(
      `${this
        .baseUrl}/api/appointment/professor/active/${id}?currentDate=${date
        .toISOString()
        .slice(0, 10)}`
    );
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

  cancelAppointment(id, cancelCode) {
    return this.http.put(
      `${this.baseUrl}/api/Appointment/cancel/${id}?cancelCode=${cancelCode}`,
      {}
    );
  }

  acceptAppointment(id) {
    return this.http.put(`${this.baseUrl}/api/Appointment/accept/${id}`, {});
  }

  rejectAppointment(id) {
    return this.http.put(`${this.baseUrl}/api/Appointment/reject/${id}`, {});
  }

  rescheduleAppointment(id, requestedDateTime) {
    return this.http.post(
      `${this.baseUrl}/api/Appointment/reschedule/${id}
    ?requestedDateTime=${requestedDateTime.toISOString()}`,
      {}
    );
  }
}
