import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MatFileUploadModule } from '../shared/fileuploadmaterial/matFileUpload.module';

import { CustomMaterialModule } from '../core/material.module'
import { RecruitmentRoutingModule } from './recruitment.routing.module'

import{ PositionService} from './services/position.service';
import{ ApplicantService} from './services/applicant.service';
import { RecruitmentMainComponent } from './recruitment-main/recruitment-main.component';
import { PositionComponent} from './positions/position/position.component';
import {ListPositionComponent} from './positions/list-position/list-position.component';
import { NotificationService } from '../shared/services/notification.service';
import { ApplicantComponent } from './applicants/applicant/applicant.component';
import { ListApplicantComponent } from './applicants/list-applicant/list-applicant.component';
import { ListInterviewerComponent } from './interviewers/list-interviewer/list-interviewer.component';
import { InterviewerComponent } from './interviewers/interviewer/interviewer.component';
import { InterviewerService } from './services/interviewer.service';

@NgModule({
  declarations: [
    RecruitmentMainComponent,
    PositionComponent,
    ListPositionComponent,
    ApplicantComponent,
    ListApplicantComponent,
    InterviewerComponent,
    ListInterviewerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    RecruitmentRoutingModule,
    MatFileUploadModule,
  ],
  providers: [
    PositionService,
    ApplicantService,
    InterviewerService,
    NotificationService,
  ],
})
export class RecruitmentModule { }
