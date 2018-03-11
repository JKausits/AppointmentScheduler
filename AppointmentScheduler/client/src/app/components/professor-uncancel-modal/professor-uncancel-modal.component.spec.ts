import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorUncancelModalComponent } from './professor-uncancel-modal.component';

describe('ProfessorUncancelModalComponent', () => {
  let component: ProfessorUncancelModalComponent;
  let fixture: ComponentFixture<ProfessorUncancelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorUncancelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorUncancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
