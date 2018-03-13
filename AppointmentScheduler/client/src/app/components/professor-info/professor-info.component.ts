import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Result from '../../result';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-info',
  templateUrl: './professor-info.component.html',
  styleUrls: ['./professor-info.component.css']
})
export class ProfessorInfoComponent implements OnInit {
  @Input() professorData;
  @Output() update = new EventEmitter();
  isEdit = false;
  result: Result;
  isHidden = false;
  constructor(private professorService: ProfessorService) {}
  info = { id: '', email: '', name: '', title: '', roomNumber: '' };
  errors: any = { email: '', name: '', title: '', roomNumber: '' };
  ngOnInit() {
    this.resetValues();
  }

  cancelEdit() {
    this.isEdit = false;
    this.resetValues();
  }

  resetValues() {
    this.info.id = this.professorData.id;
    this.info.email = this.professorData.email;
    this.info.name = this.professorData.name;
    this.info.title = this.professorData.title;
    this.info.roomNumber = this.professorData.roomNumber;
    this.errors = { email: '', name: '', title: '', roomNumber: '' };
  }

  updateInformation() {
    const info = {
      ID: this.professorData.id,
      Email: this.info.email,
      Name: this.info.name,
      Title: this.info.title,
      RoomNumber: this.info.roomNumber
    };
    this.validateInfo();
    if (!this.hasErrors()) {
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

  validateInfo() {
    this.errors = { email: '', name: '', title: '', roomNumber: '' };
    if (this.info.email === '' || !this.info.email) {
      this.errors.email = 'You must provide an email';
    }

    if (this.info.name === '' || !this.info.name) {
      this.errors.name = 'You must provide a name';
    }

    if (this.info.title === '' || !this.info.title) {
      this.errors.title = 'You must provide a title';
    }

    if (this.info.roomNumber === '' || !this.info.roomNumber) {
      this.errors.roomNumber = 'You must provide a room number';
    }
  }

  hasErrors() {
    let count = 0;
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key) && this.errors[key] !== '') {
        count++;
      }
    }
    return count > 0;
  }
}
