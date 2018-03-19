import { ScheduledHourService } from './../../services/scheduled-hour.service';
import { ProfessorService } from './../../services/professor.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css']
})
export class ProfessorHomeComponent implements OnInit {
  professorData: object;
  officeHours;
  tokenData = { ID: -1, email: '', admin: false, active: false };
  constructor(
    private auth: AuthService,
    private professorService: ProfessorService,
    private scheduledHourService: ScheduledHourService
  ) {}

  ngOnInit() {
    this.tokenData = this.auth.getTokenData();
    this.getScheduledHours();
    this.professorService.getProfessorInfo(this.tokenData.ID).subscribe(res => {
      this.professorData = res;
    });
  }

  getScheduledHours() {
    this.scheduledHourService
      .getOfficeHourItems(this.auth.getTokenData().ID)
      .subscribe(res => {
        this.officeHours = res;
      });
  }
}
