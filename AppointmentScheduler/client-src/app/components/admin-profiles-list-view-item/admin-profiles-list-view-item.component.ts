import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-admin-profiles-list-view-item',
  templateUrl: './admin-profiles-list-view-item.component.html',
  styleUrls: ['./admin-profiles-list-view-item.component.css']
})
export class AdminProfilesListViewItemComponent implements OnInit {
  @Input() professor;
  @Output() resetPassword = new EventEmitter();
  isEdit = false;
  name: string;
  email: string;
  roomNumber: string;
  title: string;
  errors: any = {};
  constructor(private professorService: ProfessorService) {}

  ngOnInit() {
    this.setValues();
  }

  toggleActivate() {
    this.professor.active = !this.professor.active;
    this.professorService
      .updateProfessorPrivateInfo(this.professor)
      .subscribe((res: any) => {
        if (res.success) {
          swal({
            title: this.professor.active
              ? 'Profile Activated'
              : 'Profile Deactivated',
            type: 'success'
          });
        } else {
          swal({ title: 'Could Not Activate/Deactive Account', type: 'error' });
          this.professor.active = !this.professor.active;
        }
      });
  }

  toggleAdmin() {
    this.professor.admin = !this.professor.admin;
    this.professorService
      .updateProfessorPrivateInfo(this.professor)
      .subscribe((res: any) => {
        if (res.success) {
          swal({
            title: this.professor.admin
              ? 'Professor Granted Admin Privileges'
              : 'Professor Revoked of Admin Privileges',
            type: 'success'
          });
        } else {
          swal({
            title: 'Could Not Grant/Revoke Admin Privileges',
            type: 'error'
          });
          this.professor.admin = !this.professor.admin;
        }
      });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.setValues();
    }
  }

  setValues() {
    this.name = this.professor.name;
    this.email = this.professor.email;
    this.roomNumber = this.professor.roomNumber;
    this.title = this.professor.title;
    this.errors = {};
  }

  updateInfo() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      const newProfessorInfo = {
        id: this.professor.id,
        name: this.name,
        email: this.email,
        title: this.title,
        roomNumber: this.roomNumber,
        active: this.professor.active,
        admin: this.professor.admin
      };

      this.professorService
        .updateProfessorPrivateInfo(newProfessorInfo)
        .subscribe((res: any) => {
          if (res.success) {
            swal({ title: 'Professor Information Updated', type: 'success' });
            this.professor.name = this.name;
            this.professor.email = this.email;
            this.professor.roomNumber = this.roomNumber;
            this.professor.title = this.title;
            this.isEdit = false;
          } else {
            swal({ title: 'Could Not Update Information', type: 'error' });
            this.setValues();
            this.isEdit = false;
          }
        });
    }
  }

  validateData() {
    this.errors = {};
    if (this.email === '' || !this.email) {
      this.errors.email = 'You must provide an email';
    }

    if (this.name === '' || !this.name) {
      this.errors.name = 'You must provide a name';
    }

    if (this.title === '' || !this.title) {
      this.errors.title = 'You must provide a title';
    }

    if (this.roomNumber === '' || !this.roomNumber) {
      this.errors.roomNumber = 'You must provide a room number';
    }
  }

  resetPasswordClick() {
    this.resetPassword.emit(this.professor.id);
  }
}
