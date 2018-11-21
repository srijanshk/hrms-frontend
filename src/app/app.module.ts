import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { LeaveFormService } from './services/leaveFormModel.services';
import { FormService } from './services/form';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggle,
  MatSliderModule,
  MatCheckboxModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatPaginatorModule



} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './service/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './Helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from './service/custom_validators';

import { FormServices } from './service/form';
import { ProfileupdateComponent } from './profiles/profileupdate/profileupdate.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeavelistService } from './services/leavelist.service';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    ProfileupdateComponent,
    LeaveFormComponent,
    LeaveListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})

  ],
  providers: [
  UserService,
    LeaveFormService,
    LeavelistService,
    AuthGuard,
    AuthenticationService,
    CustomValidators,
    FormServices,
    FormService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
