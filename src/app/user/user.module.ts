import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../core/material.module';
import { UserRoutingModule } from './user-routing.module';

import { AuthenticationService } from '../shared/services/authentication.service';
import { UserMainComponent } from './user-main/user-main.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileService } from './services/profile.service';
import { JwtInterceptor, ErrorInterceptor } from '../Helpers';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ListDisabledUsersComponent } from './list-disabled-users/list-disabled-users.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';



@NgModule({
  declarations: [
    UserMainComponent,
    ListUserComponent,
    AdduserComponent,
    CreateProfileComponent,
    EditProfileComponent,
    ViewProfileComponent,
    DeleteDialogComponent,
    ListDisabledUsersComponent,
    ListRolesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    UserRoutingModule
  ],
  providers: [
    AuthenticationService,
    ProfileService,
    ListUserComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class UserModule { }
