import { AppointmentService } from './../../services/appointment.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  times = [];
  days = [];
  appointments = [];
  changed = false;
  professorID: number;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.setCurrentWeek();
    this.buildAppointmentArray();
    this.setProfessorID();
    this.getAppointments();
  }

  setProfessorID() {
    if (this.auth.isLoggedIn()) {
      this.professorID = this.auth.getTokenData().ID;
    } else {
      this.professorID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }
  }

  getAppointments() {
    this.appointmentService
      .getWeeklyProfessorAppointments(this.professorID, this.currentWeek)
      .subscribe(res => {
        this.appointments = res;
        this.fillCalendarDates();
      });
  }

  fillCalendarDates() {
    const table = document.getElementById('calendarTable');
    this.appointments.forEach((appointment, index) => {
      appointment.dateTime = new Date(appointment.dateTime);
      const column = this.getTableColumn(appointment);
      const row = this.getTableRow(appointment);
      const cell = table.rows[row].cells[column];

      cell.dataset.index = index;
      if (appointment.status === 1) {
        cell.classList.add('appointment');
        cell.classList.add('pending');
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 2) {
        cell.classList.add('appointment');
        cell.classList.add('pending-student');
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 3) {
        cell.classList.add('appointment');
        cell.classList.add('scheduled');
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 4) {
        cell.classList.add('cancelled');
      } else {
        cell.classList.add('appointment');
      }
    });
  }

  getTableColumn(appointment) {
    // Finds the table column number
    for (let i = 0; i < this.days.length; i++) {
      if (
        this.days[i].getDate() === appointment.dateTime.getDate() &&
        this.days[i].getFullYear() === appointment.dateTime.getFullYear() &&
        this.days[i].getMonth() === appointment.dateTime.getMonth()
      ) {
        return i + 1;
      }
    }
  }

  getTableRow(appointment) {
    // FInds the table row number
    for (let i = 0; i < this.times.length; i++) {
      if (
        this.times[i].getHours() === appointment.dateTime.getHours() &&
        this.times[i].getMinutes() === appointment.dateTime.getMinutes()
      ) {
        return i + 1;
      }
    }
  }

  buildAppointmentArray() {
    let startTime = new Date();
    const endTime = new Date();

    startTime.setHours(8, 0);
    endTime.setHours(20, 0);
    while (startTime <= endTime) {
      this.times.push(startTime);

      startTime = new Date(startTime.getTime() + 15 * 60000);
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
    this.getAppointments();
  }

  getPreviousWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() - 7);
    this.setWeekDays();
    this.getAppointments();
  }

  addDays(days) {
    const date = new Date(this.currentWeek);
    date.setDate(date.getDate() + days);
    return date;
  }

  handleTableClick(event) {
    const index = event.target.getAttribute('data-index');
    if (index !== null) {
      const appointment = this.appointments[index];
      console.log(appointment);
    }
  }
}
