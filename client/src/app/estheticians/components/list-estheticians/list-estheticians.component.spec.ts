import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstheticiansComponent } from './list-estheticians.component';

describe('ListEstheticiansComponent', () => {
  let component: ListEstheticiansComponent;
  let fixture: ComponentFixture<ListEstheticiansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEstheticiansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstheticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
