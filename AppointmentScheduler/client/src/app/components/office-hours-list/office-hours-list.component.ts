import { AuthService } from './../../services/auth.service';
import { ScheduledHourService } from './../../services/scheduled-hour.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-office-hours-list',
  templateUrl: './office-hours-list.component.html',
  styleUrls: ['./office-hours-list.component.css']
})
export class OfficeHoursListComponent implements OnInit {
  @Input() professorData;
  @Input() officeHours;
  constructor(
    private scheduledHourService: ScheduledHourService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  getScheduledHours() {
    this.scheduledHourService
      .getOfficeHourItems(this.auth.getTokenData().ID)
      .subscribe(res => {
        this.officeHours = res;
      });
  }

  onAddedScheduledHour(scheduledHour) {
    this.officeHours.push(scheduledHour);
  }

  onDeleteScheduledHour(id) {
    this.officeHours = this.officeHours.filter(
      scheduledHour => scheduledHour.id !== id
    );
  }
}
