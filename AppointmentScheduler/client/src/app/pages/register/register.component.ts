import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Result from '../../result';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password: string;
  email: string;
  errors = { email: '', password: '' };
  result: Result;
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  register(): void {
    this.errors = { email: '', password: '' };
    if (!this.password) {
      this.errors.password = 'You must enter a password';
    }

    if (!this.email) {
      this.errors.email = 'You must enter in a password';
    }

    if (this.errors.email === '' && this.errors.password === '') {
      this.auth
        .register(this.email, this.password)
        .subscribe(res => (this.result = res));
    }
  }
}
