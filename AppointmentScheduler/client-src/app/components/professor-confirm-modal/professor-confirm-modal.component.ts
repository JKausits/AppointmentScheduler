import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-professor-confirm-modal',
  templateUrl: './professor-confirm-modal.component.html',
  styleUrls: ['./professor-confirm-modal.component.css']
})
export class ProfessorConfirmModalComponent implements OnInit {
  @Input() selectedAppointment;
  @Input() professor;
  @Output() appointmentChanged = new EventEmitter();
  appointmentError;
  errors: any = {};
  isRescheduling = false;
  appointmentDate: string;
  appointmentTime: string;
  today = new Date();
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.today.setHours(0, 0, 0, 0);
  }

  acceptAppointment() {
    this.appointmentService
      .acceptAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-confirm-dismiss-button').click();
          this.appointmentChanged.emit({ title: 'Appointment Accepted' });
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  resetValues() {
    this.isRescheduling = false;
  }

  rejectAppointment() {
    this.appointmentService
      .rejectAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-confirm-dismiss-button').click();
          this.appointmentChanged.emit({ title: 'Appointment Rejected' });
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  rescheduleAppointment() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      const requestedDateTime = new Date(
        `${this.appointmentDate} ${this.appointmentTime}`
      );
      this.appointmentService
        .rescheduleAppointment(this.selectedAppointment.id, requestedDateTime)
        .subscribe((res: any) => {
          if (res.success) {
            document.getElementById('professor-confirm-dismiss-button').click();
            this.appointmentChanged.emit({
              title: 'Appointment Rescheduled',
              message: 'Waiting on student confirmation'
            });
          } else {
            this.appointmentError = res.message;
          }
        });
    }
  }

  toggleRescheduleAppointment() {
    this.isRescheduling = !this.isRescheduling;
    if (this.isRescheduling) {
      this.appointmentDate = this.getDateString();
      this.appointmentTime = this.getTimeString();
    }
  }

  getDateString() {
    let month = this.selectedAppointment.dateTime.getMonth() + 1;
    const year = this.selectedAppointment.dateTime.getFullYear();
    let date = this.selectedAppointment.dateTime.getDate();

    if (date < 10) {
      date = '0' + date;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return `${year}-${month}-${date}`;
  }

  getTimeString() {
    let hours = this.selectedAppointment.dateTime.getHours();
    let minutes = this.selectedAppointment.dateTime.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
  }

  validateData() {
    this.errors = {};
    if (this.appointmentDate === '' || !this.appointmentDate) {
      this.errors.appointmentDate = 'You must enter in an appointment date.';
    }

    if (this.appointmentTime === '' || !this.appointmentTime) {
      this.errors.appointmentTime = 'You must enter in an appointment time.';
    }
  }
}
