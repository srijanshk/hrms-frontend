import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email: email, password: password })
  .pipe(map(user => {
   if (user && user.token) {
     localStorage.setItem('currentUser', JSON.stringify(user));
   }
   return user;
  }));
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
