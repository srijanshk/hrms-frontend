import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { LeaveForm } from '../models/leaveFormModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveApiService {

  constructor(
    private http: HttpClient
  ) { }

 createLeave( leaveForm: LeaveForm ) {
   console.log('leaveform', leaveForm);
  const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
  return this.http.post<LeaveForm>(`${environment.leaveApiUrl}/leave/` + userId, leaveForm );
}

  getUserLeave() {
    const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
    return this.http.get(`${environment.leaveApiUrl}/leave/` + userId);
  }

  getPendingLeaves(role) {
    return this.http.get(`${environment.leaveApiUrl}/all_pending_leaves`, {params: {role: role}} );
  }

  postApproveLeave(id, action, role){
    const payloads = {id:id, report: action, role: role};
    console.log(payloads);
    return this.http.get(`${environment.leaveApiUrl}/leave_action`, {params: payloads} );
  }
}
