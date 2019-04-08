import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollMainComponent } from './payroll-main/payroll-main.component'

const routes: Routes = [
  {
      path:'',
      component:PayrollMainComponent,
      children:[
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }