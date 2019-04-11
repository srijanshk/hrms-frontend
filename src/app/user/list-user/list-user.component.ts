import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../models/adduser-model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {
  public role: String;
  public permission: String;
  public usersource: any;
  public displayedColums;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth: AuthenticationService, private router: Router, private dialog: MatDialog, public snackbar: MatSnackBar) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
   });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
  }

  ngOnInit() {
   const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    this.permission = currentUser.permission;
    this.CheckRolesToDisplayTablesAccordingly();
    this.fetchEmployeeListbyOtherRoles();

  }

  CheckRolesToDisplayTablesAccordingly() {
    if(this.role === 'admin' || this.permission === 'ViewAdmin' || this.permission === 'NormalUser' || this.permission === 'UserAdmin'){
      this.fetchEmployeeListbyOtherRoles();
    }
  }



  fetchEmployeeListbyOtherRoles(){
    this.auth.getUser()
    .subscribe((data: User[]) => {
    this.usersource = new MatTableDataSource(data);
    this.usersource.paginator = this.paginator;
    this.usersource.sort = this.sort;
  });
  }


   applyFilter(filterValue: String) {
    this.usersource.filter = filterValue.trim().toLowerCase();

    if (this.usersource.paginator) {
      this.usersource.paginator.firstPage();
    }
  }

  navigation() {
    this.router.navigate(['/dashboard/user/add']);
  }

  isAdmin() {
    return this.role.toLowerCase() === 'admin';
  }

  isUser() {
    return this.role.toLowerCase() === 'user';

  }

  hasNormalUser() {
    return this.permission.toLowerCase() === 'NormalUser';
  }

  hasUserAdmin() {
    return this.permission.toLowerCase() === 'UserAdmin';
  }

  hasProjectAdmin() {
    return this.permission.toLowerCase() === 'ProjectAdmin';
  }

  hasViewAdmin() {
    return this.permission.toLowerCase() === 'ViewAdmin';
  }


  isAdminTable() {
    // tslint:disable-next-line:max-line-length
    return this.displayedColums = ['sn', 'fullname', 'email', 'contactNo', 'branch', 'edit', 'view', 'delete', 'reset password'];
  }
  isNormaluserTable() {
    // tslint:disable-next-line:max-line-length
    return this.displayedColums = ['sn', 'fullname', 'email', 'contactNo', 'branch', 'view'];
  }
  isViewAdminTable() {
    // tslint:disable-next-line:max-line-length
    return this.displayedColums = ['sn', 'fullname', 'email', 'contactNo', 'branch', 'view'];
  }

  isUserAdminTable() {
    // tslint:disable-next-line:max-line-length
    return this.displayedColums = ['sn', 'fullname', 'email','contactNo', 'branch', 'edit', 'view',  'delete', 'reset password'] ;
  }


  onView(_id: string) {
     this.router.navigate([`/dashboard/user/profile/view/${_id}`]);
  }

  onEdit(_id: string) {
    this.router.navigate([`/dashboard/user/profile/edit/${_id}`]);
  }

  onDelete(_id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeleteDialogComponent, dialogConfig);
    this.auth.deleteUser(_id).subscribe(() => {
    this.fetchEmployeeListbyOtherRoles();
    });
  }

  disabledUser() {
   this.router.navigate(['/dashboard/user/disabled_users'])
  }

  OnResetPassword(email: string) {
    this.auth.forgetpassword(email).subscribe(() => {
      this.snackbar.open('Link for password Reset Has been sent', 'Close', {
        duration: 3000,
    });
  });
}

  onPaginateChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
 }
}
