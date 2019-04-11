import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar } from "@angular/material";
import { InventoryFields } from '../inventory-models/inventory-model';
import { first } from 'rxjs/operators';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-listdevice',
  templateUrl: './listdevice.component.html',
  styleUrls: ['./listdevice.component.css']
})
export class ListdeviceComponent implements OnInit {
users: Array<any> = [];
userID = null;
  public dataSource: any;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  devices: any;
  // public show: boolean = false;
  displayedColumns = ['sn', 'applied_by', 'name', 'project', 'device', 'startdate', 'enddate', 'action', 'delete'];
  public role = JSON.parse(localStorage.getItem('currentUser')).user.role;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public deviceForm: FormGroup;

  constructor(
    public service: InventoryService, 
    private router: Router,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ListdeviceComponent>
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    this.getDeviceData();
  }
  getDeviceData() { 
    this.service.getDevices()
      .subscribe((data: []) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.fetchdeviceinfo();
      
    
      });
  }
onAction(id, action) {
 
  this.service.approveDevice(id, action).subscribe(data => {
    this.snackbar.open('Submitted successfully', 'Close', {
      duration: 2000,
});
  });
}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
  fetchdeviceinfo() {
    this.service.getDevices().subscribe((data: InventoryFields[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          // console.log(this.devices);
        });
  }
  onCancel(): void {
    this.dialogRef.close();
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
  }

