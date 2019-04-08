import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomValidators } from './shared/services/custom_validators';
import { JwtInterceptor, ErrorInterceptor } from './Helpers';
import { CustomMaterialModule } from './core/material.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component'
import { AuthenticationService } from './shared/services/authentication.service';
import { FormServices } from './shared/services/form';
import { EnvironmentUrlService } from './shared/services/environment-url.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    ChangepasswordComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    CustomMaterialModule

  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthenticationService,
    CustomValidators,
    FormServices,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    EnvironmentUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
