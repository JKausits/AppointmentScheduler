import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  selectedAppointment;
  constructor() {}

  ngOnInit() {}
  onAppointmentSelected(appointment) {
    this.selectedAppointment = appointment;
  }
}
