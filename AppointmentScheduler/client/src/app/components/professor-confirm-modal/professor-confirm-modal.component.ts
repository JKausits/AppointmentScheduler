import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-professor-confirm-modal',
  templateUrl: './professor-confirm-modal.component.html',
  styleUrls: ['./professor-confirm-modal.component.css']
})
export class ProfessorConfirmModalComponent implements OnInit {
  @Input() selectedAppointment;
  @Input() professor;
  constructor() {}

  ngOnInit() {}

  acceptAppointment() {
    console.log('Accepting appointment');
  }

  rejectAppointment() {
    console.log('rejecting appointment');
  }

  rescheduleAppointment() {
    console.log('rescheduling appointment');
  }
}
