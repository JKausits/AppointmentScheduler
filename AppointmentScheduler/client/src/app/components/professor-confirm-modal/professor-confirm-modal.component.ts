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
  @Output() appointmentAccepted = new EventEmitter();
  @Output() appointmentRejected = new EventEmitter();
  @Output() appointmentRescheduled = new EventEmitter();
  appointmentError;
  isRescheduling = false;
  appointmentDate: string;
  appointmentTime: string;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {}

  acceptAppointment() {
    this.appointmentService
      .acceptAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-confirm-dismiss-button').click();
          this.appointmentAccepted.emit(res);
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  rejectAppointment() {
    this.appointmentService
      .rejectAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-confirm-dismiss-button').click();
          this.appointmentRejected.emit(res);
        } else {
          this.appointmentError = res.message;
        }
      });
  }

  rescheduleAppointment() {
    const requestedDateTime = new Date(
      `${this.appointmentDate} ${this.appointmentTime}`
    );
    this.appointmentService
      .rescheduleAppointment(this.selectedAppointment.id, requestedDateTime)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-confirm-dismiss-button').click();
          this.appointmentRescheduled.emit(res);
        } else {
          this.appointmentError = res.message;
        }
      });
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
}
