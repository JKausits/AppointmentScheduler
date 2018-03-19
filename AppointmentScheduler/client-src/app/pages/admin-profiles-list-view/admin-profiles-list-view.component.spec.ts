import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilesListViewComponent } from './admin-profiles-list-view.component';

describe('AdminProfilesListViewComponent', () => {
  let component: AdminProfilesListViewComponent;
  let fixture: ComponentFixture<AdminProfilesListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfilesListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfilesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
