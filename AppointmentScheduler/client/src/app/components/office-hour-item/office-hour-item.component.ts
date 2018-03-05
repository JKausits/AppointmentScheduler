import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-office-hour-item',
  templateUrl: './office-hour-item.component.html',
  styleUrls: ['./office-hour-item.component.css']
})
export class OfficeHourItemComponent implements OnInit {
  @Input() officeHour;
  days: string;
  constructor() {}

  ngOnInit() {
    this.setDays();
  }

  setDays() {
    this.days = '';
    if (this.officeHour.monday) {
      this.days += 'M ';
    }

    if (this.officeHour.tuesday) {
      this.days += 'T ';
    }
    if (this.officeHour.wednesday) {
      this.days += 'W ';
    }
    if (this.officeHour.thursday) {
      this.days += 'R ';
    }
    if (this.officeHour.friday) {
      this.days += 'F ';
    }
  }

  formatTime(time) {
    let mm = time.substring(3, 5);
    let hh = time.substring(0, 2);
    let a = ' AM';
    if (mm.length === 1) {
      mm = '0' + mm;
    }

    if (parseInt(hh, 10) > 12) {
      hh = `${parseInt(hh, 10) - 12}`;
      a = ' PM';
    } else if (parseInt(hh, 10) === 12) {
      a = ' PM';
    }

    if (hh.length === 1) {
      hh = '0' + hh;
    }

    return `${hh}:${mm}${a}`;
  }
}
