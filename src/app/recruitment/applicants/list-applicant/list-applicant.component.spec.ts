import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicantComponent } from './list-applicant.component';

describe('ListApplicantComponent', () => {
  let component: ListApplicantComponent;
  let fixture: ComponentFixture<ListApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
