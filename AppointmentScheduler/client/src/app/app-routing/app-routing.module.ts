import { CalendarViewComponent } from './../pages/calendar-view/calendar-view.component';
import { AccessGuard } from './../access.guard';
import { ProfessorHomeComponent } from './../pages/professor-home/professor-home.component';
import { LoginComponent } from './../pages/login/login.component';
import { RegisterComponent } from './../pages/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { requiresAnonymous: true },
    canActivate: [AccessGuard]
  },
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
    path: 'calendar',
    component: CalendarViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
