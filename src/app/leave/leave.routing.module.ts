import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveMainComponent } from './leave-main/leave-main.component'

const routes: Routes = [
  {
      path:'',
      component:LeaveMainComponent,
      children:[
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
