import { AppointmentService } from './../../services/appointment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-professor-uncancel-modal',
  templateUrl: './professor-uncancel-modal.component.html',
  styleUrls: ['./professor-uncancel-modal.component.css']
})
export class ProfessorUncancelModalComponent implements OnInit {
  @Input() selectedAppointment;
  @Input() professor;
  @Output() appointmentChanged = new EventEmitter();
  canEdit = true;
  today = new Date();
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.today.setHours(0, 0, 0, 0);
  }

  uncancelAppointment() {
    this.appointmentService
      .uncancelAppointment(this.selectedAppointment.id)
      .subscribe((res: any) => {
        if (res.success) {
          document.getElementById('professor-uncancel-dismiss-button').click();
          this.appointmentChanged.emit({ title: 'Appointment Uncancelled' });
        }
      });
  }
}
