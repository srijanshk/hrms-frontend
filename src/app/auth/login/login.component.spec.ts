import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormServices } from 'src/app/shared/services/form';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {TestBed, ComponentFixture, async, inject, tick, fakeAsync} from '@angular/core/testing';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


fdescribe('Component : Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let form: FormServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [CustomMaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [AuthenticationService, FormServices]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
    });
  }));



  it('should call the login method',fakeAsync(() => {

    let service = TestBed.get(AuthenticationService);

    spyOn(service, 'login');
    spyOn(component,'onSubmit');
// fixture.debugElement.injector.get(AuthenticationService)
fixture.detectChanges();

     component.loginForm.controls['email'].setValue('user@gmail.com');
   component.loginForm.controls['password'].setValue('password');
        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.onSubmit).toHaveBeenCalledWith('user@gmail.com', 'password');
        expect(component.loginForm.valid).toBeTruthy();
       // expect(service.login).not.toHaveBeenCalledWith('user@gmail.com', 'password');
  }));
});
