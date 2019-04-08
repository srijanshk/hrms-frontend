import { NgModule } from '@angular/core';

import { PayrollRoutingModule } from './payroll.routing.module'
import { PayrollMainComponent } from './payroll-main/payroll-main.component'

@NgModule({
  declarations: [
    PayrollMainComponent
  ],
  imports: [
      PayrollRoutingModule
  ],
  providers: [
  ]
})
export class PayrollModule { }
