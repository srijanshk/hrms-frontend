import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveApiService } from '../services/leave-api.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { LeaveActionComponent } from '../leave-action/leave-action.component';


@Component({
  selector: 'app-leave-main',
  templateUrl: './leave-main.component.html',
})

export class LeaveMainComponent implements OnInit {

  public role: String;
  public leaveData: any;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns = ['sn', 'leaveType', 'description', 'leaveFrom', 'leaveTo', 'appliedOn', 'leaveStatus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leaveApi: LeaveApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    this.getLeaveData();
    
  }

  getLeaveData() { 
    this.leaveApi.getUserLeave()
      .subscribe((data: []) => {
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

  openApplyLeave(): void {
    const dialogRef = this.dialog.open(LeaveFormComponent, {
      // height: '450px',
      // width: '500px',
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLeaveApproval(): void {
    const dialogRef = this.dialog.open(LeaveActionComponent, {
      // height: '500px',
      // width: '650px',
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  isHRorAdmin() {
    const userRole = JSON.parse(localStorage.getItem('currentUser')).user.role;
    return ((userRole === 'admin') || (userRole === 'hr')) ;
  }

  onPaginationChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


}
