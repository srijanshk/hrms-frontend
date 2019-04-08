import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { User } from '../../user/models/adduser-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient, private environment: EnvironmentUrlService) { }

  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(this.createCompleteRoute(this.environment.userUrl, 'auth/login'), JSON.stringify({'email': email, 'password': password }), this.generateHeaders())
  .pipe(map(user => {
   if (user && user.token) {
     // store user details and jwt token in local storage to keep user logged in between page refreshes
     localStorage.setItem('currentUser', JSON.stringify(user));
   }
   return user;
  }));
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
  register(user: User) {
    // const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.post<any>(`${this.environment.userUrl}/auth/register`, user);
  }

  private createCompleteRoute(envAddress: string, route: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  getUser() {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.get(`${environment.userUrl}/auth/user`, {headers: headers});
  }

  getUserbyid(_id) {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.get(`${environment.userUrl}/auth/user/${_id}`, {headers: headers});
  }

  deleteUser(_id) {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.delete(`${environment.userUrl}/auth/user/${_id}`, {headers: headers});
  }


  getUserbyLineManager() {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token});
    return this.http.get(`${environment.userUrl}/auth/lm`, {headers: headers});
  }

  getDisabledUsers() {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token});
    return this.http.get(`${environment.userUrl}/auth/disabled_users`, {headers: headers});
  }

  enableUsers(_id) {
    const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.put(`${environment.userUrl}/auth/user/${_id}`, {headers: headers});
  }

  forgetpassword(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.environment.userUrl}/auth/forgetpassword`, JSON.stringify({'email': email}), {headers: headers} );
  }
  resetpassword(newPassword: string, verifyPassword: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .set('token', location.search.slice(7, 47) );
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${this.environment.userUrl}/auth/resetpassword`, JSON.stringify({'newPassword': newPassword, 'verifyPassword': verifyPassword}), {headers: headers , params } );
  }
  changepassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.put<any>(`${this.environment.userUrl}/auth/updatepassword`, JSON.stringify({'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmPassword': confirmPassword}), this.generateHeaders());
  }

 
}
