import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentListPageComponent } from './assessment-list-page.component';

describe('AssessmentListPageComponent', () => {
  let component: AssessmentListPageComponent;
  let fixture: ComponentFixture<AssessmentListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
