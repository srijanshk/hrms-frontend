import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateAssessmentRoutingModule } from './create-assessment-routing.module';

import { GetDataService } from './services/subjects/get.data.service';
import { MenuComponent } from './menu/menu.component';
import { AssessmentListPageComponent } from './assessment-list-page/assessment-list-page.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAssessmentComponent } from './assessment/create-assessment.component';

@NgModule({
  declarations: [
    CreateAssessmentComponent,
    MenuComponent,
    AssessmentListPageComponent,
    PageNotFoundComponent,
    CreateQuestionComponent,
    UpdateQuestionComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    CreateAssessmentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    GetDataService
  ]
})
export class CreateAssessmentModule { }
