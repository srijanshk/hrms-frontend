import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeavelistService {

  constructor(private http: HttpClient) { }

  getLeaveListbyAdminandManager(user) {
    return this.http.get(`${environment.apiUrl}/leaves/${user}`);
  }


}
