import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCancelModalComponent } from './student-cancel-modal.component';

describe('StudentCancelModalComponent', () => {
  let component: StudentCancelModalComponent;
  let fixture: ComponentFixture<StudentCancelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCancelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
