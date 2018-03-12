import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-professor-scheduled-modal',
  templateUrl: './professor-scheduled-modal.component.html',
  styleUrls: ['./professor-scheduled-modal.component.css']
})
export class ProfessorScheduledModalComponent implements OnInit {
  @Input() selectedAppointment;
  @Input() professor;
  @Output() appointmentChanged = new EventEmitter();
  appointmentError;
  isRescheduling = false;
  appointmentDate: string;
  appointmentTime: string;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {}

  toggleRescheduleAppointment() {
    this.isRescheduling = !this.isRescheduling;
    if (this.isRescheduling) {
      this.appointmentDate = this.getDateString();
      this.appointmentTime = this.getTimeString();
    }
  }

  rejectAppointment() {
    this.appointmentService
      .rejectAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-scheduled-dismiss-button').click();
          this.appointmentChanged.emit({
            title: 'Appointment Rejected'
          });
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
          document.getElementById('professor-scheduled-dismiss-button').click();
          this.appointmentChanged.emit({
            title: 'Appointment Rescheduled',
            message: 'Waiting on student confirmation'
          });
        } else {
          this.appointmentError = res.message;
        }
      });
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
