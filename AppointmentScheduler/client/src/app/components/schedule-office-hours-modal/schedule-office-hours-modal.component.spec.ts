import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfficeHoursModalComponent } from './schedule-office-hours-modal.component';

describe('ScheduleOfficeHoursModalComponent', () => {
  let component: ScheduleOfficeHoursModalComponent;
  let fixture: ComponentFixture<ScheduleOfficeHoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleOfficeHoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOfficeHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
