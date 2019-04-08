import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSnackBar, MatSort, MatDialogRef } from '@angular/material';
import { LeaveApiService } from '../services/leave-api.service';
import { Router } from '@angular/router';
import { Roles } from '../models/roles';


@Component({
  selector: 'app-leave-action',
  templateUrl: './leave-action.component.html',
  styleUrls: ['./leave-action.component.css']
})

export class LeaveActionComponent implements OnInit {

  public leaveData: any;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns = ['sn', 'applied_by', 'leaveType', 'no_of_Days', 'description', 'leaveFrom', 'leaveTo', 'appliedOn', 'action'];
  public role = JSON.parse(localStorage.getItem('currentUser')).user.role;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leaveApi: LeaveApiService,
    private router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<LeaveActionComponent>

  ) { }

  ngOnInit() {
    this.getPendingLeavesForApproval(this.rolesInInt(this.role));

  }


  onApprove(id, action) {
    this.leaveApi.postApproveLeave(id, action, this.rolesInInt(this.role))
      .subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close();
      const message = data.message;
      this.snackbar.open(
        message, 'Close', {
          duration: 3000,
        });
      });
  }



  rolesInInt(user_role) {
    if (user_role === 'employee') {
      return Roles.employee;
    } else if (user_role === 'hr') {
      return Roles.hr;
    } else if (user_role === 'manager') {
      return Roles.manager;
    } else if (user_role === 'admin') {
      return Roles.admin;
    }
  }

  getPendingLeavesForApproval(role) {
    this.leaveApi.getPendingLeaves(role)
      .subscribe((data: any) => {
        console.log(data);
        this.leaveData = new MatTableDataSource(data);
        this.leaveData.paginator = this.paginator;
        this.leaveData.sort = this.sort;
      });
  }

  applyFilter(filterValue: String) {
    this.leaveData.filter = filterValue.trim().toLowerCase();

    if (this.leaveData.paginator) {
      this.leaveData.paginator.firstPage();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onPaginationChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
