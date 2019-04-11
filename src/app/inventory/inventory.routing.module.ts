import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { AddDeviceComponent } from './add-device/add-device.component'
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { ListdeviceComponent } from  './listdevice/listdevice.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
      path:'',
      redirectTo:'list',
      pathMatch: 'full'
    },{
      path:'list',
      component:DevicelistComponent,
    },{
    path:'list-device',
    component:ListdeviceComponent,
  },
    {
      path:'device/add',
      component:AddDeviceComponent
    },
    {
      path: 'device/edit',
      component:EditDeviceComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
