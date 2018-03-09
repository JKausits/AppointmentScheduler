import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilesListViewItemComponent } from './admin-profiles-list-view-item.component';

describe('AdminProfilesListViewItemComponent', () => {
  let component: AdminProfilesListViewItemComponent;
  let fixture: ComponentFixture<AdminProfilesListViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfilesListViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfilesListViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
