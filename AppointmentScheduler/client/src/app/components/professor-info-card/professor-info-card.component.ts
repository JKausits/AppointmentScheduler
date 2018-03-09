import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-professor-info-card',
  templateUrl: './professor-info-card.component.html',
  styleUrls: ['./professor-info-card.component.css']
})
export class ProfessorInfoCardComponent implements OnInit {
  @Input() professor;
  constructor() {}

  ngOnInit() {}
}
