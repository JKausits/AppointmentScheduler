import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorScheduledModalComponent } from './professor-scheduled-modal.component';

describe('ProfessorScheduledModalComponent', () => {
  let component: ProfessorScheduledModalComponent;
  let fixture: ComponentFixture<ProfessorScheduledModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorScheduledModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorScheduledModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
