import { AuthService } from './../../services/auth.service';
import { ScheduledHourService } from './../../services/scheduled-hour.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Result from '../../Result';
import ScheduledHourResult from '../../scheduledHourResult';
@Component({
  selector: 'app-schedule-office-hours-modal',
  templateUrl: './schedule-office-hours-modal.component.html',
  styleUrls: ['./schedule-office-hours-modal.component.css']
})
export class ScheduleOfficeHoursModalComponent implements OnInit {
  @Input() professorID: number;
  @Output() addScheduledHour = new EventEmitter();
  errors: any = {
    daysSelected: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    typeID: ''
  };
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  typeID: string;
  result: ScheduledHourResult;
  constructor(
    private scheduledHourService: ScheduledHourService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  resetValues() {
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
    this.startDate = '';
    this.endDate = '';
    this.startTime = '';
    this.endTime = '';
    this.typeID = '';
    this.errors = {
      daysSelected: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      typeID: ''
    };
  }

  addOfficeHour() {
    const info = {
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.startTime,
      endTime: this.endTime,
      typeID: this.typeID,
      professorID: this.auth.getTokenData().ID
    };

    this.validateInfo();
    if (!this.hasErrors()) {
      this.scheduledHourService.createScheduledHour(info).subscribe(res => {
        this.result = res;
        if (this.result.success) {
          this.addScheduledHour.emit(this.result.scheduledHour);
          document.getElementById('dismiss-button').click();
        }
      });
    }
  }

  validateInfo() {
    this.errors = {
      daysSelected: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      typeID: ''
    };

    // Validate Days
    if (
      !this.monday &&
      !this.tuesday &&
      !this.wednesday &&
      !this.thursday &&
      !this.friday
    ) {
      this.errors.daysSelected =
        'At least one day of the week must be selected';
    }

    // Validate Dates
    if (this.startDate === '' || !this.startDate) {
      this.errors.startDate = 'You must enter in a start date';
    }

    if (this.endDate === '' || !this.endDate) {
      this.errors.endDate = 'You must enter in an end date';
    }

    if (
      this.errors.startDate === '' &&
      this.errors.endDate === '' &&
      new Date(this.startDate) >= new Date(this.endDate)
    ) {
      this.errors.startDate = 'Start date cannot be after the end date';
    }
    // Validate Times
    if (this.startTime === '' || !this.startTime) {
      this.errors.startTime = 'You must enter in a start time';
    }

    if (this.endTime === '' || !this.endTime) {
      this.errors.endTime = 'You must enter in an end time';
    }

    if (
      this.errors.startTime === '' &&
      this.errors.endTime === '' &&
      this.startTime >= this.endTime
    ) {
      this.errors.startTime = 'Start time cannot be after the end time';
    }

    // Validate Type
    if (this.typeID === '' || !this.typeID) {
      this.errors.typeID = 'You must select the type of office hour';
    }
  }

  hasErrors() {
    let count = 0;
    for (let key in this.errors) {
      if (this.errors.hasOwnProperty(key) && this.errors[key] !== '') {
        count++;
      }
    }
    return count > 0;
  }
}
