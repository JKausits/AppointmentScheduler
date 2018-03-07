import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  selectedAppointment;
  constructor() {}
  appointmentScheduled: Date;
  refreshedOn = new Date();
  ngOnInit() {}
  onAppointmentSelected(appointment) {
    this.selectedAppointment = appointment;
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
      text: event.message,
      type: 'success'
    });
    this.refreshedOn = new Date();
  }
}
