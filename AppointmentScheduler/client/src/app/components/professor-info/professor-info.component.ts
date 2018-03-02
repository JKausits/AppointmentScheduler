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

  ngOnInit() {}

  updateInformation() {
    const info = {
      ID: this.professorData.id,
      Email: this.professorData.email,
      Name: this.professorData.name,
      Title: this.professorData.title,
      RoomNumber: this.professorData.roomNumber
    };
    // this.professorService.updateProfessorPublicInfo(info).subscribe(res => {
    //   this.result = res;
    //   if (this.result.success) {
    //     this.isEdit = false;
    //   }
    // });
  }
}
