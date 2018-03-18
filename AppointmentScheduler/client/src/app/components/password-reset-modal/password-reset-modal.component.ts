import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-reset-modal',
  templateUrl: './password-reset-modal.component.html',
  styleUrls: ['./password-reset-modal.component.css']
})
export class PasswordResetModalComponent implements OnInit {
  password = '';
  confirmPassword = '';
  errors: any = {};
  @Input() professorID;
  @Output() passwordReset = new EventEmitter();
  constructor(private professorService: ProfessorService) {}

  ngOnInit() {}

  resetValues() {
    this.password = '';
    this.confirmPassword = '';
  }

  resetPassword() {
    this.validateData();
    if (Object.keys(this.errors).length === 0) {
      this.professorService
        .resetPassword(this.professorID, this.password)
        .subscribe((res: any) => {
          if (res.success) {
            this.resetValues();
            document.getElementById('reset-password-dismiss-button').click();
            this.passwordReset.emit(res.message);
          } else {
            this.errors.result = res.message;
          }
        });
    }
  }

  validateData() {
    this.errors = {};
    if (this.password === '' || !this.password) {
      this.errors.password = 'You must provide a password';
    }

    if (this.confirmPassword !== this.password) {
      this.errors.confirmPassword = 'Your passwords did not match';
    }
  }
}
