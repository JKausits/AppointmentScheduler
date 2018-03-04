import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-office-hours-list',
  templateUrl: './office-hours-list.component.html',
  styleUrls: ['./office-hours-list.component.css']
})
export class OfficeHoursListComponent implements OnInit {
  @Input() professorData;
  constructor() {}

  ngOnInit() {}
}
