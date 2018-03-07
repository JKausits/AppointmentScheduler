import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorConfirmModalComponent } from './professor-confirm-modal.component';

describe('ProfessorConfirmModalComponent', () => {
  let component: ProfessorConfirmModalComponent;
  let fixture: ComponentFixture<ProfessorConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
