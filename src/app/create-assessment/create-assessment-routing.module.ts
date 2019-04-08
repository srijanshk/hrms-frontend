import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AssessmentListPageComponent } from './assessment-list-page/assessment-list-page.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { CreateAssessmentComponent } from './assessment/create-assessment.component';

const routes: Routes = [
  {
      path: '',
      component: CreateAssessmentComponent,
      children: [
          {
              path: 'home',
              component: HomePageComponent
          },
          {
              path: 'assessment/:subject',
              component: AssessmentListPageComponent
          },
          {path: 'create/:subject',
          component: CreateQuestionComponent
        },
          {path: 'update/:subject/:question',
           component: UpdateQuestionComponent},
          {path: 'pageNotFound', component: PageNotFoundComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAssessmentRoutingModule { }
