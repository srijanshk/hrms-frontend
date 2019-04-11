import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdeviceComponent } from './listdevice.component';

describe('ListdeviceComponent', () => {
  let component: ListdeviceComponent;
  let fixture: ComponentFixture<ListdeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
