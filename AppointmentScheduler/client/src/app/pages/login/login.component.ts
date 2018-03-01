import { Component, OnInit } from '@angular/core';
import Result from '../../result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  result: Result;
  keepLogged = false;
  errors = { password: '', email: '' };
  constructor() {}

  ngOnInit() {}

  login() {
    this.errors = { email: '', password: '' };
    if (!this.password) {
      this.errors.password = 'You must enter in a password';
    }

    if (!this.email) {
      this.errors.email = 'You must enter in a password';
    }
  }
}
