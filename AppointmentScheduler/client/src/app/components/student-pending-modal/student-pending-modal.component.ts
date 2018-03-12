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
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {}

  acceptAppointment() {
    this.appointmentService
      .studentConfirmAppointment(
        this.selectedAppointment.id,
        this.cancellationCode
      )
      .subscribe((res: any) => {
        if (res.success) {
          this.resetValues();
          document.getElementById('student-pending-dismiss-button').click();
          this.appointmentChanged.emit('Appointment Accepted');
        }
      });
  }

  rejectAppointment() {
    this.appointmentService
      .studentCancelScheduledAppointment(
        this.selectedAppointment.id,
        this.cancellationCode
      )
      .subscribe((res: any) => {
        if (res.success) {
          this.resetValues();
          document.getElementById('student-pending-dismiss-button').click();
          this.appointmentChanged.emit('Appointment Cancelled');
        }
      });
  }

  resetValues() {
    this.cancellationCode = '';
  }
}
