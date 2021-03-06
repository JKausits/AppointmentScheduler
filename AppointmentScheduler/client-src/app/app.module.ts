import { AppointmentService } from './services/appointment.service';
import { ScheduledHourService } from './services/scheduled-hour.service';
import { ProfessorService } from './services/professor.service';
import { AccessGuard } from './access.guard';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS
} from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfessorHomeComponent } from './pages/professor-home/professor-home.component';
import { ProfessorInfoComponent } from './components/professor-info/professor-info.component';
import { OfficeHoursListComponent } from './components/office-hours-list/office-hours-list.component';
import { ScheduleOfficeHoursModalComponent } from './components/schedule-office-hours-modal/schedule-office-hours-modal.component';
import { OfficeHourItemComponent } from './components/office-hour-item/office-hour-item.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StudentScheduleModalComponent } from './components/student-schedule-modal/student-schedule-modal.component';
import { StudentCancelModalComponent } from './components/student-cancel-modal/student-cancel-modal.component';
import { ProfessorConfirmModalComponent } from './components/professor-confirm-modal/professor-confirm-modal.component';
import { ProfessorScheduledModalComponent } from './components/professor-scheduled-modal/professor-scheduled-modal.component';
import { AppointmentListViewComponent } from './pages/appointment-list-view/appointment-list-view.component';
import { AppointmentListViewItemComponent } from './components/appointment-list-view-item/appointment-list-view-item.component';
import { ProfessorInfoCardComponent } from './components/professor-info-card/professor-info-card.component';
import { ProfessorsComponent } from './pages/professors/professors.component';
import { AdminProfilesListViewComponent } from './pages/admin-profiles-list-view/admin-profiles-list-view.component';
import { AdminProfilesListViewItemComponent } from './components/admin-profiles-list-view-item/admin-profiles-list-view-item.component';
import { ProfessorUncancelModalComponent } from './components/professor-uncancel-modal/professor-uncancel-modal.component';
import { StudentPendingModalComponent } from './components/student-pending-modal/student-pending-modal.component';
import { CancelledAppointmentsListViewItemComponent } from './components/cancelled-appointments-list-view-item/cancelled-appointments-list-view-item.component';
import { CancelledAppointmentsListViewComponent } from './components/cancelled-appointments-list-view/cancelled-appointments-list-view.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { PasswordResetModalComponent } from './components/password-reset-modal/password-reset-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfessorHomeComponent,
    ProfessorInfoComponent,
    OfficeHoursListComponent,
    ScheduleOfficeHoursModalComponent,
    OfficeHourItemComponent,
    CalendarViewComponent,
    CalendarComponent,
    StudentScheduleModalComponent,
    StudentCancelModalComponent,
    ProfessorConfirmModalComponent,
    ProfessorScheduledModalComponent,
    AppointmentListViewComponent,
    AppointmentListViewItemComponent,
    ProfessorInfoCardComponent,
    ProfessorsComponent,
    AdminProfilesListViewComponent,
    AdminProfilesListViewItemComponent,
    ProfessorUncancelModalComponent,
    StudentPendingModalComponent,
    CancelledAppointmentsListViewItemComponent,
    CancelledAppointmentsListViewComponent,
    RegisterModalComponent,
    PasswordResetModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule.forRoot()
  ],
  providers: [
    AuthService,
    AccessGuard,
    ProfessorService,
    ScheduledHourService,
    AppointmentService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcfuEwUAAAAADKUN81ylha4nfIits-KMt2eeWT3'
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
