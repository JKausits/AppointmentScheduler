import { ProfessorService } from './../../services/professor.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-student-cancel-modal',
  templateUrl: './student-cancel-modal.component.html',
  styleUrls: ['./student-cancel-modal.component.css']
})
export class StudentCancelModalComponent implements OnInit {
  @Input() selectedAppointment: any;
  professor: any;
  cancellationCode = '';
  cancelCodeError: string;
  constructor(private professorService: ProfessorService) {}

  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedAppointment) {
      this.professorService
        .getProfessorInfo(this.selectedAppointment.professorID)
        .subscribe(res => {
          this.professor = res;
        });
    }
  }

  cancelAppointment() {
    if (this.cancellationCode === '') {
      this.cancelCodeError = `You didn't enter in a code`;
    } else {
      console.log(this.cancellationCode);
    }
  }
}
