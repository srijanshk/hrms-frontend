import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileupdateComponent } from './profiles/profileupdate/profileupdate.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveListComponent } from './leave-list/leave-list.component';

const routes: Routes = [
  { path: '',
  component: LoginComponent},
  {
    path: 'leaves',
    component: LeaveFormComponent
},
{
  path: 'leavelist',
  component: LeaveListComponent
},
{
  path: 'dashboard',
  component: DashboardComponent, canActivate: [AuthGuard]
},


{
  path: 'profile',
  component: ProfileupdateComponent, canActivate: [AuthGuard]
},

  {path: 'register', component: RegisterComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
