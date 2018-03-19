import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListViewItemComponent } from './appointment-list-view-item.component';

describe('AppointmentListViewItemComponent', () => {
  let component: AppointmentListViewItemComponent;
  let fixture: ComponentFixture<AppointmentListViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
