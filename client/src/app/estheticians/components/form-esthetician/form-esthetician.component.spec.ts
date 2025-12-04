import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstheticianComponent } from './form-esthetician.component';

describe('FormEstheticianComponent', () => {
  let component: FormEstheticianComponent;
  let fixture: ComponentFixture<FormEstheticianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstheticianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstheticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
