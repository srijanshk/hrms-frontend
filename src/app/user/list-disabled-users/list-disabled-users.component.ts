import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DisabledUsers } from '../models/disableuser-model';
import { ListUserComponent } from '../list-user/list-user.component';

@Component({
  selector: 'app-list-disabled-users',
  templateUrl: './list-disabled-users.component.html',
  styleUrls: ['./list-disabled-users.component.css']
})
export class ListDisabledUsersComponent implements OnInit {

  public role: String;
  public usersource: any;
  displayedColums = ['sn', 'fullname', 'email', 'post', 'Project', 'branch', 'lineManager', 'role', 'contactNo', 'enable'];
  public pageSize = 10;
  public pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(private auth: AuthenticationService, private router: Router, public listuser: ListUserComponent) { }

ngOnInit() {
    this.fetchdisabledusersinfo();
}

fetchdisabledusersinfo() {
          this.auth.getDisabledUsers().subscribe((data: DisabledUsers[]) => {
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

enabledUser() {
      return this.router.navigate(['/dashboard/user/list']);
}

onPaginateChange(event) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}

onEnable(_id: string) {
    this.auth.enableUsers(_id).subscribe(() => {

    this.listuser.fetchEmployeeListbyOtherRoles();
    this.fetchdisabledusersinfo();
    });
    }
}
