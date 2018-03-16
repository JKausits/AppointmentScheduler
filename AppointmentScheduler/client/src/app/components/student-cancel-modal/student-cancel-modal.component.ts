import { AppointmentService } from './../../services/appointment.service';
import { ProfessorService } from './../../services/professor.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-student-cancel-modal',
  templateUrl: './student-cancel-modal.component.html',
  styleUrls: ['./student-cancel-modal.component.css']
})
export class StudentCancelModalComponent implements OnInit {
  @Input() selectedAppointment: any;
  @Output() appointmentChanged = new EventEmitter();
  @Input() professor: any;
  cancellationCode = '';
  cancellationReason = '';
  cancelCodeError: string;
  errors: any = {};
  isTrusted = false;
  constructor(
    private professorService: ProfessorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}

  resetValues() {
    this.cancellationCode = '';
    this.cancelCodeError = '';
    this.cancellationReason = '';
  }

  resolved($event) {
    this.isTrusted = event.isTrusted;
  }

  cancelAppointment() {
    this.validateErrors();
    if (Object.keys(this.errors).length === 0) {
      console.log(
        this.selectedAppointment.id,
        this.cancellationCode,
        this.cancellationReason
      );

      this.appointmentService
        .studentCancelScheduledAppointment(
          this.selectedAppointment.id,
          this.cancellationCode,
          this.cancellationReason
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.resetValues();
            document.getElementById('student-cancel-dismiss-button').click();
            this.appointmentChanged.emit({ title: 'Appointment Cancelled' });
          } else {
            this.errors.cancelCodeError = res.message;
          }
        });
    } else {
      console.log(this.errors);
    }
  }

  validateErrors() {
    this.errors = {};
    if (this.cancellationCode === '') {
      this.errors.cancelCodeError = `You didn't enter in a code`;
    }
    if (!this.isTrusted) {
      this.errors.isTrusted = 'You must verify that you are a human';
    }
  }
}
