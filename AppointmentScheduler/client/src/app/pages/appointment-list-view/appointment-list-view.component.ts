import { AuthService } from './../../services/auth.service';
import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list-view',
  templateUrl: './appointment-list-view.component.html',
  styleUrls: ['./appointment-list-view.component.css']
})
export class AppointmentListViewComponent implements OnInit {
  appointments;
  constructor(
    private appointmentService: AppointmentService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService
      .getPendingOrScheduleProfessorAppointmentsAfterThisWeek(
        this.auth.getTokenData().ID
      )
      .subscribe((res: any) => {
        this.appointments = res;
      });
  }

  onAppointmentRejected(id) {
    this.appointments = this.appointments.filter(
      appointment => appointment.id !== id
    );
  }
}
