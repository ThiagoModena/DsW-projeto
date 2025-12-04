import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstheticiansAreaComponent } from './estheticians-area.component';

describe('EstheticiansAreaComponent', () => {
  let component: EstheticiansAreaComponent;
  let fixture: ComponentFixture<EstheticiansAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstheticiansAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstheticiansAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
