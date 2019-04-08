import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {
  public role: String;
  public userData: any;
  public permission: any[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns = ['sn', 'fullname' , 'role', 'permission'];
  filterValues = {
    fullname: ''
  };
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
     private service: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
    ) {
   }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    this.permission = currentUser.permission;
    this.getUserData();

  }

  getUserData() {
this.service.getUser()
.subscribe((res: []) => {
  this.userData = new MatTableDataSource(res);}
  , errorResponse => {
    console.log(errorResponse);
  }
  , () => {
  this.userData.paginator = this.paginator;
  this.userData.sort = this.sort;
  this.userData.filterPredicate =
    (data:fullname, filter: string) => !filter || data.filterValue === filter;

})
  }

  applyFilter(filterValue: String) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.userData.filter = filterValue;
    if (this.userData.paginator) {
      this.userData.paginator.firstPage();
    }
  }

  onPaginationChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


}
