import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakeAssessmentComponent } from './take/take.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { SubmitComponent } from './submit/submit.component';

const routes: Routes = [
  {
    path:'',
    component: TakeAssessmentComponent,
    children:[
      { path: '', component: StartPageComponent },
      { path: 'questions', component: AssessmentComponent },
      { path: 'submit', component: SubmitComponent },
      // { path: "questions/:id", component: AssessmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeAssessmentRoutingModule { }
