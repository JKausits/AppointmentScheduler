import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AppointmentService {
  baseUrl = 'http://localhost:49495';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getProfessorAppointments(id) {
    return this.http.get(`${this.baseUrl}/api/appointment/professor/${id}`);
  }

  getPendingOrScheduleProfessorAppointmentsAfterThisWeek(id) {
    const date = new Date();

    return this.http.get(
      `${this
        .baseUrl}/api/appointment/professor/active/${id}?currentDate=${date
        .toISOString()
        .slice(0, 10)}`,
      {
        headers: this.auth.getAuthHeader()
      }
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

  getProfessorAppointmentCancellations(id) {
    return this.http.get(`${this.baseUrl}/api/appointment/cancellations/${id}`);
  }

  scheduleAppointment(appointment) {
    return this.http.post(`${this.baseUrl}/api/Appointment`, appointment);
  }

  studentCancelScheduledAppointment(id, cancelCode, cancellationReason) {
    return this.http.put(
      `${this
        .baseUrl}/api/Appointment/cancel/${id}?cancelCode=${cancelCode}&cancellationReason=${cancellationReason}`,
      {}
    );
  }

  studentConfirmAppointment(id, cancelCode) {
    return this.http.put(
      `${this
        .baseUrl}/api/Appointment/student/accept/${id}?cancelCode=${cancelCode}`,
      {}
    );
  }

  cancelAppointment(id) {
    console.log('Cancelling');
    return this.http.put(
      `${this.baseUrl}/api/Appointment/professor/cancel/${id}`,
      '',
      {
        headers: this.auth.getAuthHeader()
      }
    );
  }

  uncancelAppointment(id) {
    return this.http.put(
      `${this.baseUrl}/api/Appointment/professor/uncancel/${id}`,
      '',
      {
        headers: this.auth.getAuthHeader()
      }
    );
  }

  acceptAppointment(id) {
    return this.http.put(`${this.baseUrl}/api/Appointment/accept/${id}`, '', {
      headers: this.auth.getAuthHeader()
    });
  }

  rejectAppointment(id) {
    return this.http.put(`${this.baseUrl}/api/Appointment/reject/${id}`, '', {
      headers: this.auth.getAuthHeader()
    });
  }

  rescheduleAppointment(id, requestedDateTime) {
    return this.http.post(
      `${this.baseUrl}/api/Appointment/reschedule/${id}
    ?requestedDateTime=${requestedDateTime.toISOString()}`,
      '',
      {
        headers: this.auth.getAuthHeader()
      }
    );
  }
}
