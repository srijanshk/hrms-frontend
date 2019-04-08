import { NgModule } from '@angular/core';

import { CandidateRoutingModule } from './candidate.routing.module'
import { CandidateMainComponent } from './candidate-main/candidate-main.component'

@NgModule({
  declarations: [
    CandidateMainComponent
  ],
  imports: [
      CandidateRoutingModule
  ],
  providers: [
  ]
})
export class CandidateModule { }
