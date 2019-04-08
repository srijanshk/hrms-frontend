import { NgModule } from '@angular/core';

import { CustomMaterialModule } from '../core/material.module';
import { LeaveRoutingModule } from './leave.routing.module';
import { LeaveMainComponent } from './leave-main/leave-main.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveActionComponent } from './leave-action/leave-action.component';

@NgModule({
  declarations: [
    LeaveActionComponent,
    LeaveMainComponent,
    LeaveFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LeaveRoutingModule,
    CustomMaterialModule
  ],
  providers: [
  ],
  entryComponents: [LeaveFormComponent, LeaveActionComponent]
})
export class LeaveModule { }
