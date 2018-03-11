import { AuthService } from './../../services/auth.service';
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
  selector: 'app-student-schedule-modal',
  templateUrl: './student-schedule-modal.component.html',
  styleUrls: ['./student-schedule-modal.component.css']
})
export class StudentScheduleModalComponent implements OnInit {
  @Input() selectedAppointment;
  professor;
  email;
  firstName;
  lastName;
  bannerID;
  isLoggedIn: boolean;
  errors: any = {};
  @Output() appointmentScheduled = new EventEmitter();
  @Output() appointmentCancelled = new EventEmitter();
  constructor(
    private professorService: ProfessorService,
    private appointmentSevice: AppointmentService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedAppointment) {
      this.professorService
        .getProfessorInfo(this.selectedAppointment.professorID)
        .subscribe(res => {
          this.professor = res;
        });
    }
  }

  resetValues() {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.bannerID = '';
  }

  scheduleAppointment() {
    this.validateData();

    if (Object.keys(this.errors).length === 0) {
      this.selectedAppointment.firstName = this.firstName;
      this.selectedAppointment.lastName = this.lastName;
      this.selectedAppointment.email = this.email;
      this.selectedAppointment.bannerID = this.bannerID;
      this.appointmentSevice
        .scheduleAppointment(this.selectedAppointment)
        .subscribe((res: any) => {
          if (res.success) {
            this.appointmentScheduled.emit(res);
            document.getElementById('dismiss-button').click();
            this.resetValues();
          }
        });
    } else {
      console.log(this.errors);
    }
  }

  cancelAppointment() {
    this.appointmentSevice
      .cancelAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.resetValues();
          document.getElementById('dismiss-button').click();
          this.appointmentCancelled.emit(res);
        }
      });
  }

  validateData() {
    this.errors = {};
    if (!this.firstName) {
      this.errors.firstName = 'Must include a first name';
    }

    if (!this.lastName) {
      this.errors.lastName = 'Must include a last name';
    }

    if (!this.email) {
      this.errors.email = 'Must include an email';
    }

    if (!this.bannerID) {
      this.errors.bannerID = 'Must include a banner ID';
    }
  }
}
