import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { CustomMaterialModule } from '../core/material.module'
import { InventoryRoutingModule } from './inventory.routing.module'
import { AddDeviceComponent } from './add-device/add-device.component'
import { DevicelistComponent } from './devicelist/devicelist.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';

@NgModule({
  declarations: [
    AddDeviceComponent,
    DevicelistComponent,
    EditDeviceComponent
  ],
  imports: [
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InventoryRoutingModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class InventoryModule { }
