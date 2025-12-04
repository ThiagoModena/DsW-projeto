import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsAreaComponent } from './appointments-area.component';

describe('AppointmentsAreaComponent', () => {
  let component: AppointmentsAreaComponent;
  let fixture: ComponentFixture<AppointmentsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
