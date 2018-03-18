import { AuthService } from './../../services/auth.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profiles-list-view',
  templateUrl: './admin-profiles-list-view.component.html',
  styleUrls: ['./admin-profiles-list-view.component.css']
})
export class AdminProfilesListViewComponent implements OnInit {
  professors;
  resetID;
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
    });
  }

  onProfessorRegistered(event) {
    swal({ title: event.message, type: 'success' });
    this.getProfessors();
  }

  onPasswordReset(event) {
    swal({ title: event, type: 'success' });
  }

  onResetPasswordClick(event) {
    this.resetID = event;
  }
}
