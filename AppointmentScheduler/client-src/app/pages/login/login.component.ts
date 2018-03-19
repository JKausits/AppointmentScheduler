import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Result from '../../result';
import { Location } from '@angular/common';

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
  constructor(private auth: AuthService, private location: Location) {}

  ngOnInit() {}

  login() {
    this.errors = { email: '', password: '' };
    if (!this.password) {
      this.errors.password = 'You must enter in a password';
    }

    if (!this.email) {
      this.errors.email = 'You must enter in a password';
    }

    if (this.errors.email === '' && this.errors.password === '') {
      this.auth.login(this.email, this.password).subscribe(res => {
        this.result = res;

        if (this.result.success) {
          if (this.keepLogged) {
            window.localStorage.setItem('token', this.result.message);
          } else if (this.result.success) {
            window.sessionStorage.setItem('token', this.result.message);
          }
          location.replace('home');
        }
      });
    }
  }
}
