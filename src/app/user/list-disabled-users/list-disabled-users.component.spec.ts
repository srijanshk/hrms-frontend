import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisabledUsersComponent } from './list-disabled-users.component';

describe('ListDisabledUsersComponent', () => {
  let component: ListDisabledUsersComponent;
  let fixture: ComponentFixture<ListDisabledUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDisabledUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDisabledUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
