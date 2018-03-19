import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoComponent } from './professor-info.component';

describe('ProfessorInfoComponent', () => {
  let component: ProfessorInfoComponent;
  let fixture: ComponentFixture<ProfessorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
