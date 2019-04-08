import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
     canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'leave',
        loadChildren: './leave/leave.module#LeaveModule'
      },
      {
        path: 'recruitment',
        loadChildren: './recruitment/recruitment.module#RecruitmentModule'
      },
      {
        path: 'inventory',
        loadChildren: './inventory/inventory.module#InventoryModule'
      },
      {
        path: 'candidate',
        loadChildren: './candidate/candidate.module#CandidateModule'
      },
      {
        path: 'createAssessment',
        loadChildren: './create-assessment/create-assessment.module#CreateAssessmentModule'
      },
      {
        path: 'takeAssessment',
        loadChildren: './take-assessment/take-assessment.module#TakeAssessmentModule'
      },
      {
        path: 'payroll',
        loadChildren: './payroll/payroll.module#PayrollModule'
      }
    ]
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent
  },
  {
    path: 'changepassword',
    canActivate: [AuthGuard],
    component: ChangepasswordComponent
  },
  { path: '**', component: PageNotFoundComponent}, // windcard round should be in a last always.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
