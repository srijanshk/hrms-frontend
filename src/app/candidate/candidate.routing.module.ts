import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateMainComponent } from './candidate-main/candidate-main.component'

const routes: Routes = [
  {
      path:'',
      component:CandidateMainComponent,
      children:[
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }