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
  cancelCodeError: string;
  constructor(
    private professorService: ProfessorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}

  resetValues() {
    this.cancellationCode = '';
    this.cancelCodeError = '';
  }

  cancelAppointment() {
    if (this.cancellationCode === '') {
      this.cancelCodeError = `You didn't enter in a code`;
    } else {
      this.appointmentService
        .studentCancelScheduledAppointment(
          this.selectedAppointment.id,
          this.cancellationCode
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.resetValues();
            document.getElementById('student-cancel-dismiss-button').click();
            this.appointmentChanged.emit({ title: 'Appointment Cancelled' });
          } else {
            this.cancelCodeError = res.message;
          }
        });
    }
  }
}
