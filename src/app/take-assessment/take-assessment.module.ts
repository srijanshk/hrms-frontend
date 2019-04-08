import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TakeAssessmentRoutingModule } from './take-assessment-routing.module';
import { TakeAssessmentComponent } from './take/take.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { QuestionComponent } from './question/question.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SubmitComponent } from './submit/submit.component';
import { CustomValidators } from '../shared/services/custom_validators';
import { EnvironmentUrlService } from '../shared/services/environment-url.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FormServices } from '../shared/services/form';


@NgModule({
  declarations: [
    TakeAssessmentComponent,
    AssessmentComponent,
    QuestionComponent,
    StartPageComponent,
    SubmitComponent
  ],
  imports: [
    CommonModule,
    TakeAssessmentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule
  ],
  providers: [
    AuthenticationService,
    CustomValidators,
    FormServices,
    EnvironmentUrlService
  ],
})
export class TakeAssessmentModule { }
