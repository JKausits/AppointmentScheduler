import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-pending-modal',
  templateUrl: './student-pending-modal.component.html',
  styleUrls: ['./student-pending-modal.component.css']
})
export class StudentPendingModalComponent implements OnInit {
  @Input() professor;
  @Input() selectedAppointment;
  @Output() appointmentChanged = new EventEmitter();
  cancellationCode: string;
  errors: any = {};
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {}

  acceptAppointment() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      this.appointmentService
        .studentConfirmAppointment(
          this.selectedAppointment.id,
          this.cancellationCode
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.resetValues();
            document.getElementById('student-pending-dismiss-button').click();
            this.appointmentChanged.emit({ title: 'Appointment Accepted' });
          } else {
            this.errors.cancellationCode = 'Invalid Code';
          }
        });
    }
  }

  rejectAppointment() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      this.appointmentService
        .studentCancelScheduledAppointment(
          this.selectedAppointment.id,
          this.cancellationCode,
          ''
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.resetValues();
            document.getElementById('student-pending-dismiss-button').click();
            this.appointmentChanged.emit({ title: 'Appointment Cancelled' });
          } else {
            this.errors.cancellationCode = 'Invalid Code';
          }
        });
    }
  }

  resetValues() {
    this.cancellationCode = '';
  }

  validateData() {
    this.errors = {};
    if (this.cancellationCode === '' || !this.cancellationCode) {
      this.errors.cancellationCode = 'You must enter in a code';
    }
  }
}
