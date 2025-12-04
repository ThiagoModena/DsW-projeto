import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresAreaComponent } from './procedures-area.component';

describe('ProceduresAreaComponent', () => {
  let component: ProceduresAreaComponent;
  let fixture: ComponentFixture<ProceduresAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceduresAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceduresAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
