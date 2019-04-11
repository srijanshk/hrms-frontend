import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { InventoryFields } from '../inventory-models/inventory-model';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { ListdeviceComponent } from '../listdevice/listdevice.component';


@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.css']
})
export class DevicelistComponent implements OnInit {

  public role: String;
  public dataSource: any;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  devices: any;
  // public show: boolean = false;
  displayedColumns = ['sn', 'applied_by', 'project', 'device', 'startdate', 'enddate', 'status'];

  // devices: Array<any> = [];
  // deviceId = null;
  // displayForm: boolean = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public deviceForm: FormGroup;

  constructor(public service: InventoryService, 
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    this.getDeviceData();
  }

    // this.getDeviceData();
  getDeviceData() { 
    this.service.getDevices()
      .subscribe((data: []) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
       
      
    
      });
  }

    // const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    // this.role = currentUser.role;
    //  console.log(this.role)
    // this.service.getDevices()
    //   .subscribe((data) => {
    //     this.devices = data;
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     // console.log(this.devices);
    //   });

    // this.service.selectedDevice = {
    //   "id": null,
    //   "name": '',
    //   "project": '',
    //   "device": '',
    //   "startdate": '',
    //   "enddate": ''
    // };
   
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


onCreate() {
  
  const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width = "60%";
  this.dialog.open(AddDeviceComponent, dialogConfig);
}
openListDevice() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "90%";
    this.dialog.open(ListdeviceComponent, dialogConfig);
  }

public onDelete(id: string) {
  this.service.deleteDevice(id)
    .subscribe((resp) => {
      console.log(resp);
      if (resp['status'] == 200) {
        location.reload();
        this.devices = this.devices.filter((device) => device.id != id);
      }
    });

}
  // public onSubmit(form: FormGroup) {
  //   location.reload();
  //   console.log(form.value);
  //   if (form.value.id == null) {
  //     this.service.postDevice(form.value)
  //       .subscribe((resp) => {
  //         console.log(resp);
  //         if (resp["status"] == 201) {
  //           this.service.getDevices()
  //             .subscribe((data) =>
  //               this.devices = data);
  //         }
  //       });
  //   } else {
  //     this.service.putDevice(form.value)
  //       .subscribe((resp) => {
  //         console.log(resp);
  //         if (resp["status"] == 200) {
  //         }
  //       });
  //   }
  // }

  
  //   this.dialog.open(AddDeviceComponent)
  //   this.service.getDevice(id)
  //     .subscribe((data) => {
  //       this.service.selectedDevice = data;
  //     });
    
  // }

  // public updateList(device: any, deviceId) {
  //   for (var i = 0; i < this.devices.length; i++) {
  //     if (device.id == this.devices[i].id)
  //       this.devices[i] = device;
  //     return;
  //   }
  // }

  // public deleteConfirm(id: string) {
  //   this.deviceId = id;
  //   console.log();
  // }

  // public cancelDelete() {
  //   this.deviceId = null;
  //   console.log("cancel");
  // }

 
}





