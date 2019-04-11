import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public email: String;
  public role: String;
  public permission: String;
  public _id: String;
  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.email = currentUser.email;
    this.role = currentUser.role;
    this.permission = currentUser.permission;
    this._id = currentUser._id;
  }

  logOut() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  ManageRoles() {
    this.router.navigate(['/dashboard/user/roles_list']);
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

  viewOwnProfile() {
    this.router.navigate([`/dashboard/user/profile/view/${this._id}`]);
  }

  editOwnProfile() {
    this.router.navigate([`/dashboard/user/profile/edit/${this._id}`]);
  }
}
