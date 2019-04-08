import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruitmentMainComponent } from './recruitment-main/recruitment-main.component';
import { ListPositionComponent } from './positions/list-position/list-position.component';
import {PositionComponent} from './positions/position/position.component';
import { ListApplicantComponent } from './applicants/list-applicant/list-applicant.component';
import { ApplicantComponent } from './applicants/applicant/applicant.component';
import { ListInterviewerComponent } from './interviewers/list-interviewer/list-interviewer.component';
import { InterviewerComponent } from './interviewers/interviewer/interviewer.component';
const routes: Routes = [
  {
      path:'',
      component: RecruitmentMainComponent,
    },
    {
      path:'position',
      children:[
        {
          path: 'list',
          component:ListPositionComponent
        },
        {
          path: 'add',
          component:PositionComponent
        }
      ]
    },
    {
      path:'applicant',
      children:[
        {
          path: 'list',
          component:ListApplicantComponent
        },
        {
          path: 'add',
          component:ApplicantComponent
        }
      ]
    },
    {
      path:'interviewer',
      children:[
        {
          path: 'list',
          component:ListInterviewerComponent
        },
        {
          path: 'add',
          component:InterviewerComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }