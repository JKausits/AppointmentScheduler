import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-profiles-list-view-item',
  templateUrl: './admin-profiles-list-view-item.component.html',
  styleUrls: ['./admin-profiles-list-view-item.component.css']
})
export class AdminProfilesListViewItemComponent implements OnInit {
  @Input() professor;
  constructor() {}

  ngOnInit() {}
}
