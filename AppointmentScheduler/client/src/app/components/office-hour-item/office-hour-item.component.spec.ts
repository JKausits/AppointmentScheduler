import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHourItemComponent } from './office-hour-item.component';

describe('OfficeHourItemComponent', () => {
  let component: OfficeHourItemComponent;
  let fixture: ComponentFixture<OfficeHourItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeHourItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHourItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
