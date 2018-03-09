import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {
  professors;
  constructor(private professorService: ProfessorService) {}

  ngOnInit() {
    this.getProfessors();
  }

  getProfessors() {
    this.professorService.getActiveProfessors().subscribe((res: any) => {
      this.professors = res;
      console.log(this.professors);
    });
  }
}
