import { Component, OnInit, Input } from '@angular/core';
import Result from '../../result';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-info',
  templateUrl: './professor-info.component.html',
  styleUrls: ['./professor-info.component.css']
})
export class ProfessorInfoComponent implements OnInit {
  @Input() professorData;
  isEdit = false;
  result: Result;
  isHidden = false;
  constructor(private professorService: ProfessorService) {}
  info = { id: '', email: '', name: '', title: '', roomNumber: '' };
  ngOnInit() {
    this.info.id = this.professorData.id;
    this.info.email = this.professorData.email;
    this.info.name = this.professorData.name;
    this.info.title = this.professorData.title;
    this.info.roomNumber = this.professorData.roomNumber;
  }

  updateInformation() {
    const info = {
      ID: this.professorData.id,
      Email: this.info.email,
      Name: this.info.name,
      Title: this.info.title,
      RoomNumber: this.info.roomNumber
    };
    this.professorService.updateProfessorPublicInfo(info).subscribe(res => {
      this.result = res;
      if (this.result.success) {
        this.isEdit = false;
        this.professorData.email = this.info.email;
        this.professorData.name = this.info.name;
        this.professorData.title = this.info.title;
        this.professorData.roomNumber = this.info.roomNumber;
      }
    });
  }
}
