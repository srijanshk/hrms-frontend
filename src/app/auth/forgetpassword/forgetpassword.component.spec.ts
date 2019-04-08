import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswordComponent } from './forgetpassword.component';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

xdescribe('ForgetpasswordComponent', () => {
  let component: ForgetpasswordComponent;
  let fixture: ComponentFixture<ForgetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswordComponent ],
      imports: [CustomMaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      providers: [AuthenticationService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ForgetpasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));



});
