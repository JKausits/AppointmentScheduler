import { AuthService } from './../../services/auth.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  selectedAppointment;
  appointmentScheduled: Date;
  refreshedOn = new Date();
  professor: any;

  constructor(
    private professorService: ProfessorService,
    private auth: AuthService
  ) {}
  ngOnInit() {}
  onAppointmentSelected(appointment) {
    this.selectedAppointment = appointment;
    this.getProfessor();
  }

  getProfessor() {
    this.professorService
      .getProfessorInfo(this.selectedAppointment.professorID)
      .subscribe(res => {
        this.professor = res;
      });
  }

  onAppointmentScheduled(event) {
    swal({
      title: 'Appointment Scheduled',
      text: event.message,
      type: 'success'
    });
    this.refreshedOn = new Date();
  }

  onAppointmentCancelled(event) {
    swal({
      title: 'Appointment Cancelled',
      type: 'success'
    });
    this.refreshedOn = new Date();
  }

  onAppointmentUncancelled(event) {
    swal({
      title: 'Appointment Uncancelled',
      type: 'success'
    });
    this.refreshedOn = new Date();
  }

  onAppointmentAccepted(event) {
    swal({
      title: 'Appointment Accepted',
      type: 'success'
    });
    this.refreshedOn = new Date();
  }

  onAppointmentRejected(event) {
    swal({
      title: 'Appointment Rejected',
      type: 'success'
    });
    this.refreshedOn = new Date();
  }

  onAppointmentRescheduled(event) {
    swal({
      title: 'Appointment Rejected',
      type: 'success'
    });
    this.refreshedOn = new Date();
  }
}
