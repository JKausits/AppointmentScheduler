import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cancelled-appointments-list-view-item',
  templateUrl: './cancelled-appointments-list-view-item.component.html',
  styleUrls: ['./cancelled-appointments-list-view-item.component.css']
})
export class CancelledAppointmentsListViewItemComponent implements OnInit {
  @Input() appointment;
  constructor() {}

  ngOnInit() {
    this.appointment.dateTime = new Date(this.appointment.dateTime);
    this.appointment.created = new Date(this.appointment.created);
  }
}
