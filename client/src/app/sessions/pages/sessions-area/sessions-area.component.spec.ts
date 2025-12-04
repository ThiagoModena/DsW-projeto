import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsAreaComponent } from './sessions-area.component';

describe('SessionsAreaComponent', () => {
  let component: SessionsAreaComponent;
  let fixture: ComponentFixture<SessionsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
