import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})


export class ListRolesComponent implements OnInit {
  public userData: any;
  public pageSize = 10;
  public pageIndex = 0;
  public displayedColumns = ['sn', 'fullname' , 'role', 'permission'];

  dataSource = new MatTableDataSource();
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
     private service: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
    ) {
   }

  ngOnInit() {

    this.getUserData();
    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      return data.fullname === filter;
     };

  }

  getUserData() {
this.service.getUser()
.subscribe((res: []) => {
  this.userData = new MatTableDataSource(res);
  this.dataSource = this.userData; }
  , errorResponse => {
    console.log(errorResponse);
  }
  , () => {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

 });
  }



  applyFilter(filtervalue) {
    //  filtervalue = filtervalue.trim(); // Remove whitespace
    //  filtervalue = filtervalue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtervalue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPaginationChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}

export interface Element {
  sn: number;
  fullname: string;
  role: string;
  permission: string;
 }
