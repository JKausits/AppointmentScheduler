import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPendingModalComponent } from './student-pending-modal.component';

describe('StudentPendingModalComponent', () => {
  let component: StudentPendingModalComponent;
  let fixture: ComponentFixture<StudentPendingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPendingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPendingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
