import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListViewComponent } from './appointment-list-view.component';

describe('AppointmentListViewComponent', () => {
  let component: AppointmentListViewComponent;
  let fixture: ComponentFixture<AppointmentListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
