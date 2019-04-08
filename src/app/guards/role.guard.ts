import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import { AuthenticationService } from '../shared/services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   const expectedRole = next.data.expectedRole;
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   const token = currentUser.token;


   // decode the token to get its payload
   const tokenPayload = decode(token);

  if ( currentUser.user.role && tokenPayload.role !== expectedRole) {
  this.router.navigate(['login']);
  return false;
  }
  return true;

  }
}
