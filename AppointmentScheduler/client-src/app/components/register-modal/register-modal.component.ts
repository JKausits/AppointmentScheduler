import { AuthService } from './../../services/auth.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  password;
  email;
  name;
  title;
  roomNumber;
  isActive = true;
  isAdmin = false;
  errors: any = {};
  confirmPassword;
  @Output() registered = new EventEmitter();
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  resetValues() {
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.name = '';
    this.title = '';
    this.roomNumber = '';
    this.isActive = true;
    this.isAdmin = false;
    this.errors = {};
  }

  register() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      this.auth
        .register(
          this.email,
          this.password,
          this.name,
          this.isAdmin,
          this.isActive,
          this.title,
          this.roomNumber
        )
        .subscribe((res: any) => {
          if (res.success) {
            document.getElementById('register-User-dismiss-button').click();
            this.registered.emit(res);
          } else {
            this.errors.registration = res.message;
          }
        });
    }
  }

  validateData() {
    this.errors = {};

    if (this.email === '' || !this.email) {
      this.errors.email = 'You must provide a user email';
    }

    if (this.name === '' || !this.name) {
      this.errors.name = 'You must provide the name of the user';
    }

    if (this.title === '' || !this.title) {
      this.errors.title = 'You must provide the users title';
    }

    if (this.roomNumber === '' || !this.roomNumber) {
      this.errors.roomNumber = 'You must provide the users room number';
    }

    if (this.password === '' || !this.password) {
      this.errors.password = 'You must provide a password';
    }

    if (this.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'The passwords you enter do not match';
    }
  }
}
