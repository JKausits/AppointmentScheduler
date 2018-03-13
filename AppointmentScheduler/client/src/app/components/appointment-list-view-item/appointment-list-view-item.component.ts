import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-appointment-list-view-item',
  templateUrl: './appointment-list-view-item.component.html',
  styleUrls: ['./appointment-list-view-item.component.css']
})
export class AppointmentListViewItemComponent implements OnInit {
  @Input() appointment;
  @Output() appointmentRejected = new EventEmitter();
  errors: any = {};
  isReschedule = false;
  appointmentError;
  appointmentTime;
  appointmentDate;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.appointment.dateTime = new Date(this.appointment.dateTime);
  }

  toggleReschedule() {
    this.isReschedule = !this.isReschedule;
    this.errors = {};
    if (this.isReschedule) {
      this.appointmentDate = this.getDateString();
      this.appointmentTime = this.getTimeString();
    }
  }

  getDateString() {
    let month = this.appointment.dateTime.getMonth() + 1;
    const year = this.appointment.dateTime.getFullYear();
    let date = this.appointment.dateTime.getDate();

    if (date < 10) {
      date = '0' + date;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return `${year}-${month}-${date}`;
  }

  getTimeString() {
    let hours = this.appointment.dateTime.getHours();
    let minutes = this.appointment.dateTime.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
  }

  rescheduleAppointment() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      const requestedDateTime = new Date(
        `${this.appointmentDate} ${this.appointmentTime}`
      );
      this.appointmentService
        .rescheduleAppointment(this.appointment.id, requestedDateTime)
        .subscribe((res: any) => {
          if (res.success) {
            this.appointment.status = 2;
            this.appointment.dateTime = requestedDateTime;
            this.toggleReschedule();
            swal({ title: 'Appointment Rescheduled', type: 'success' });
          } else {
            this.appointmentError = res.message;
          }
        });
    }
  }

  rejectAppointment() {
    this.appointmentService
      .rejectAppointment(this.appointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.appointmentRejected.emit(this.appointment.id);
          swal({ title: 'Appointment Rejected', type: 'success' });
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  acceptAppointment() {
    this.appointmentService
      .acceptAppointment(this.appointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.appointment.status = 3;
          swal({ title: 'Appointment Accepted', type: 'success' });
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  validateData() {
    this.errors = {};
    if (this.appointmentDate === '' || !this.appointmentDate) {
      this.errors.appointmentDate = 'You must enter in an appointment date';
    }

    if (this.appointmentTime === '' || !this.appointmentTime) {
      this.errors.appointmentTime = 'You must enter in an appointment time';
    }
  }
}
