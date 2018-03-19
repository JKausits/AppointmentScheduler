import { AppointmentService } from './../../services/appointment.service';
import { AuthService } from './../../services/auth.service';
import swal from 'sweetalert2';
import {
  Component,
  OnInit,
  ApplicationRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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
  appointments: any;
  @Input() parentRefreshed;
  @Output() appointmentSelected = new EventEmitter();
  professorID: Number;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private appointmentService: AppointmentService
  ) {
    this.currentWeek = new Date();
  }

  ngOnInit() {
    this.setCurrentWeek();
    this.buildAppointmentArray();
    this.setProfessorID();
    this.getAppointments();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (changes.parentRefreshed) {
      this.resetTable();
    }
  }

  resetTable() {
    this.setCurrentWeek();
    this.setWeekDays();
    this.clearAppointments();
    this.buildAppointmentArray();
    this.setProfessorID();
    this.getAppointments();
  }

  clearAppointments() {
    const table: any = document.getElementById('calendarTable');
    for (let i = 0; i < this.days.length; i++) {
      for (let j = 0; j < this.times.length; j++) {
        const cell = table.rows[j + 1].cells[i + 1];
        cell.classList = '';
        cell.dataset.index = '';
        cell.innerHTML = '';
      }
    }
  }

  setProfessorID() {
    this.professorID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!this.professorID && this.auth.isLoggedIn()) {
      this.professorID = this.auth.getTokenData().ID;
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const table: any = document.getElementById('calendarTable');
    this.appointments.forEach((appointment, index) => {
      appointment.dateTime = new Date(appointment.dateTime);
      const column = this.getTableColumn(appointment);
      const row = this.getTableRow(appointment);
      const cell = table.rows[row].cells[column];
      // console.log(`Row: ${row} Column: ${column}`);
      if (!column) {
        console.log(appointment);
      }

      const isLoggedIn = this.auth.isLoggedIn();

      cell.dataset.index = index;
      if (appointment.status === 1) {
        cell.classList.add('pending');
        if (isLoggedIn || appointment.dateTime > today) {
          cell.classList.add('appointment');
          cell.dataset.toggle = 'modal';
          cell.dataset.target = isLoggedIn
            ? '#professorConfirmModal'
            : '#studentCancelModal';
        }
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 2) {
        cell.classList.add('pending-student');
        if (isLoggedIn || appointment.dateTime > today) {
          cell.classList.add('appointment');
          cell.dataset.toggle = 'modal';
          cell.dataset.target = isLoggedIn
            ? '#professorScheduledModal'
            : '#studentPendingModal';
        }
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 3) {
        cell.classList.add('scheduled');
        if (isLoggedIn || appointment.dateTime > today) {
          cell.classList.add('appointment');
          cell.dataset.toggle = 'modal';
          cell.dataset.target = isLoggedIn
            ? '#professorScheduledModal'
            : '#studentCancelModal';
        }
        cell.innerHTML = `${appointment.firstName} ${appointment.lastName}`;
      } else if (appointment.status === 4) {
        cell.classList.add('cancelled');
        if (isLoggedIn) {
          cell.classList.add('appointment');
          cell.dataset.toggle = 'modal';
          cell.dataset.target = '#professorUncancelAppointmentModal';
        }
      } else {
        cell.classList.add('appointment');
        if (appointment.dateTime > today) {
          cell.dataset.toggle = 'modal';
          cell.dataset.target = '#studentScheduleModal';
        } else {
          cell.classList.add('non-click');
        }
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

    startTime.setHours(10, 0);
    endTime.setHours(19, 0);
    this.times = [];
    while (startTime <= endTime) {
      this.times.push(startTime);

      startTime = new Date(startTime.getTime() + 15 * 60000);
    }
  }

  setCurrentWeek() {
    const day = this.currentWeek.getDay(),
      diff = this.currentWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    this.currentWeek = new Date(this.currentWeek.setDate(diff));
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
    this.resetTable();
  }

  getPreviousWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() - 7);
    this.resetTable();
  }

  getNextMonth() {
    this.currentWeek.setMonth(this.currentWeek.getMonth() + 1);
    this.resetTable();
  }

  getPreviousMonth() {
    this.currentWeek.setMonth(this.currentWeek.getMonth() - 1);
    this.resetTable();
  }

  addDays(days) {
    const date = new Date(this.currentWeek);
    date.setDate(date.getDate() + days);
    return date;
  }

  handleTableClick(event) {
    const index = event.target.getAttribute('data-index');
    if (index !== null) {
      this.appointmentSelected.emit(this.appointments[index]);
    }
  }
}
