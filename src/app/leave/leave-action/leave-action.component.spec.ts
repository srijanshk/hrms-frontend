import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveActionComponent } from './leave-action.component';

describe('LeaveActionComponent', () => {
  let component: LeaveActionComponent;
  let fixture: ComponentFixture<LeaveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
