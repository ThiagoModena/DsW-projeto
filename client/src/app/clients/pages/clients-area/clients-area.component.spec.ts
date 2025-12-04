import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAreaComponent } from './clients-area.component';

describe('ClientsAreaComponent', () => {
  let component: ClientsAreaComponent;
  let fixture: ComponentFixture<ClientsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
