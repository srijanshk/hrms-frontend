import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LeavelistService } from '../services/leavelist.service';
import { LeaveList } from '../models/leavelistmodel';


@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  leavelistsource: any;
  displayedLeaveListColumns = ['leaveType', 'start_date', 'end_date', 'selectTypeOfDays', 'noOfDays', 'leaveReason'];

  @ViewChild(MatPaginator)paginator: MatPaginator;

  constructor(private leavelistservice: LeavelistService) { }

  ngOnInit() {
    this.getAllLeaveInfo();
  }

  public getAllLeaveInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const user = currentUser.user._id;
    this.leavelistservice.getLeaveListbyAdminandManager(user).subscribe((data: LeaveList[]) => {
    this.leavelistsource = new MatTableDataSource(data);
    this.leavelistsource.paginator = this.paginator;
    });
  }

}
