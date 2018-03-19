import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHoursListComponent } from './office-hours-list.component';

describe('OfficeHoursListComponent', () => {
  let component: OfficeHoursListComponent;
  let fixture: ComponentFixture<OfficeHoursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeHoursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
