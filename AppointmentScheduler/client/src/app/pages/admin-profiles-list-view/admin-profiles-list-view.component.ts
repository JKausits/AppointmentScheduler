import { AuthService } from './../../services/auth.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profiles-list-view',
  templateUrl: './admin-profiles-list-view.component.html',
  styleUrls: ['./admin-profiles-list-view.component.css']
})
export class AdminProfilesListViewComponent implements OnInit {
  professors;
  constructor(
    private professorService: ProfessorService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getProfessors();
  }

  getProfessors() {
    this.professorService.getProfessors().subscribe((res: any) => {
      this.professors = res;
      console.log(this.professors);
    });
  }
}
