import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledAppointmentsListViewItemComponent } from './cancelled-appointments-list-view-item.component';

describe('CancelledAppointmentsListViewItemComponent', () => {
  let component: CancelledAppointmentsListViewItemComponent;
  let fixture: ComponentFixture<CancelledAppointmentsListViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledAppointmentsListViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledAppointmentsListViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
