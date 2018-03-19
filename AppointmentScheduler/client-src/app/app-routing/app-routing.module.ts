import { AdminProfilesListViewComponent } from './../pages/admin-profiles-list-view/admin-profiles-list-view.component';
import { ProfessorsComponent } from './../pages/professors/professors.component';
import { AppointmentListViewComponent } from './../pages/appointment-list-view/appointment-list-view.component';
import { CalendarViewComponent } from './../pages/calendar-view/calendar-view.component';
import { AccessGuard } from './../access.guard';
import { ProfessorHomeComponent } from './../pages/professor-home/professor-home.component';
import { LoginComponent } from './../pages/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { requiresAnonymous: true },
    canActivate: [AccessGuard]
  },
  {
    path: 'home',
    component: ProfessorHomeComponent,
    data: { requiresLogin: true },
    canActivate: [AccessGuard]
  },
  {
    path: 'calendar/:id',
    component: CalendarViewComponent,
    pathMatch: 'full',
    data: { requiresAdminOrAnonymous: true },
    canActivate: [AccessGuard]
  },
  {
    path: 'calendar',
    component: CalendarViewComponent,
    pathMatch: 'full',
    data: { requiresLogin: true },
    canActivate: [AccessGuard]
  },
  {
    path: 'list',
    component: AppointmentListViewComponent,
    data: { requiresLogin: true },
    canActivate: [AccessGuard]
  },
  {
    path: '',
    component: ProfessorsComponent
  },
  {
    path: 'admin',
    component: AdminProfilesListViewComponent,
    data: { requiresAdmin: true },
    canActivate: [AccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
