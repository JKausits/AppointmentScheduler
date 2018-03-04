import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-office-hours-modal',
  templateUrl: './schedule-office-hours-modal.component.html',
  styleUrls: ['./schedule-office-hours-modal.component.css']
})
export class ScheduleOfficeHoursModalComponent implements OnInit {
  @Input() professorID: number;
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
  constructor() {}

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
      typeID: this.typeID
    };
    console.log(info);
    this.resetValues();
  }

  validateInfo() {
    if (
      !this.monday &&
      !this.tuesday &&
      !this.wednesday &&
      !this.thursday &&
      !this.friday
    ) {
      return {
        success: false,
        message: 'At least one day of the week must be selected'
      };
    }
  }
}
