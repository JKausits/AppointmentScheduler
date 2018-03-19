import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledAppointmentsListViewComponent } from './cancelled-appointments-list-view.component';

describe('CancelledAppointmentsListViewComponent', () => {
  let component: CancelledAppointmentsListViewComponent;
  let fixture: ComponentFixture<CancelledAppointmentsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledAppointmentsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledAppointmentsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
