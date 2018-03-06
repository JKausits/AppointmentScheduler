import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScheduleModalComponent } from './student-schedule-modal.component';

describe('StudentScheduleModalComponent', () => {
  let component: StudentScheduleModalComponent;
  let fixture: ComponentFixture<StudentScheduleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentScheduleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
