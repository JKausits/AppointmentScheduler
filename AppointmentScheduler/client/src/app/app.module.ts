import { ScheduledHourService } from './services/scheduled-hour.service';
import { ProfessorService } from './services/professor.service';
import { AccessGuard } from './access.guard';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfessorHomeComponent } from './pages/professor-home/professor-home.component';
import { ProfessorInfoComponent } from './components/professor-info/professor-info.component';
import { OfficeHoursListComponent } from './components/office-hours-list/office-hours-list.component';
import { ScheduleOfficeHoursModalComponent } from './components/schedule-office-hours-modal/schedule-office-hours-modal.component';
import { OfficeHourItemComponent } from './components/office-hour-item/office-hour-item.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfessorHomeComponent,
    ProfessorInfoComponent,
    OfficeHoursListComponent,
    ScheduleOfficeHoursModalComponent,
    OfficeHourItemComponent,
    CalendarViewComponent,
    CalendarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, AccessGuard, ProfessorService, ScheduledHourService],
  bootstrap: [AppComponent]
})
export class AppModule {}
