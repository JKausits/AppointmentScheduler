import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoCardComponent } from './professor-info-card.component';

describe('ProfessorInfoCardComponent', () => {
  let component: ProfessorInfoCardComponent;
  let fixture: ComponentFixture<ProfessorInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
