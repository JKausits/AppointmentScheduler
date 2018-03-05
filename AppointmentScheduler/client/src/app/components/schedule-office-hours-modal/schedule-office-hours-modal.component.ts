import { AuthService } from './../../services/auth.service';
import { ScheduledHourService } from './../../services/scheduled-hour.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Result from '../../Result';
@Component({
  selector: 'app-schedule-office-hours-modal',
  templateUrl: './schedule-office-hours-modal.component.html',
  styleUrls: ['./schedule-office-hours-modal.component.css']
})
export class ScheduleOfficeHoursModalComponent implements OnInit {
  @Input() professorID: number;
  @Output() addScheduledHour = new EventEmitter();
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
  result: Result;
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
    this.scheduledHourService.createScheduledHour(info).subscribe(res => {
      this.result = res;
      if (this.result.success) {
        this.addScheduledHour.emit(info);
        document.getElementById('dismiss-button').click();
      }
    });
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
