import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cancelled-appointments-list-view',
  templateUrl: './cancelled-appointments-list-view.component.html',
  styleUrls: ['./cancelled-appointments-list-view.component.css']
})
export class CancelledAppointmentsListViewComponent implements OnInit {
  @Input() professorID;
  cancelledAppointments;
  isHidden = false;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.getProfessorCancelledAppointments();
  }

  getProfessorCancelledAppointments() {
    this.appointmentService
      .getProfessorAppointmentCancellations(this.professorID)
      .subscribe(res => {
        this.cancelledAppointments = res;
      });
  }
}
