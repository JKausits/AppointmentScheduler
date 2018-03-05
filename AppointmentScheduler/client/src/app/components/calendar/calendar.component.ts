import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentWeek;
  monday = new Date();
  tuesday = new Date();
  wednesday = new Date();
  thursday = new Date();
  friday = new Date();
  startTime = new Date();
  endTime = new Date();
  times = [];
  days = [];
  changed = false;
  constructor() {
    this.startTime.setHours(8, 0, 0);
    this.endTime.setHours(20, 0, 0);

    this.setCurrentWeek();
    this.buildAppointmentArray();
  }

  ngOnInit() {}

  buildAppointmentArray() {
    this.startTime.setHours(8, 0);
    this.endTime.setHours(20, 0);
    while (this.startTime <= this.endTime) {
      this.times.push(this.startTime);

      this.startTime = new Date(this.startTime.getTime() + 15 * 60000);
    }
  }
  setCurrentWeek() {
    const d = new Date();
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    this.currentWeek = new Date(d.setDate(diff));
    this.setWeekDays();
  }

  setWeekDays() {
    this.days = [];
    this.days.push(new Date(this.addDays(0)));
    this.days.push(new Date(this.addDays(1)));
    this.days.push(new Date(this.addDays(2)));
    this.days.push(new Date(this.addDays(3)));
    this.days.push(new Date(this.addDays(4)));
  }

  getNextWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() + 7);
    this.setWeekDays();
  }

  getPreviousWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() - 7);
    this.setWeekDays();
  }

  addDays(days) {
    const date = new Date(this.currentWeek);
    date.setDate(date.getDate() + days);
    return date;
  }
}
