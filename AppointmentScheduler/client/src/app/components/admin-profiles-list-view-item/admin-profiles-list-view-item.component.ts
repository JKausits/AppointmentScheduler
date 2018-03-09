import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-admin-profiles-list-view-item',
  templateUrl: './admin-profiles-list-view-item.component.html',
  styleUrls: ['./admin-profiles-list-view-item.component.css']
})
export class AdminProfilesListViewItemComponent implements OnInit {
  @Input() professor;
  constructor(private professorService: ProfessorService) {}

  ngOnInit() {}

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
          swal({ title: 'Could not activate/deactive account', type: 'error' });
        }
      });
  }
}
