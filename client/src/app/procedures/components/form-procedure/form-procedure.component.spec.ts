import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcedureComponent } from './form-procedure.component';

describe('FormProcedureComponent', () => {
  let component: FormProcedureComponent;
  let fixture: ComponentFixture<FormProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
