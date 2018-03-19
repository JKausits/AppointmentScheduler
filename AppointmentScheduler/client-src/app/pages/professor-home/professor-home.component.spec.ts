import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorHomeComponent } from './professor-home.component';

describe('ProfessorHomeComponent', () => {
  let component: ProfessorHomeComponent;
  let fixture: ComponentFixture<ProfessorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
