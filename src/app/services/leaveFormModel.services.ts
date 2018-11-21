import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LeaveForm } from '../models/leaveFormModel';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Leave } from '../leave-form/leave-form.component';

@Injectable()
export class LeaveFormService {
  constructor(private http: HttpClient) {}

  registerLeaveForm(leaveform: LeaveForm): Observable<LeaveForm> {
    return this.http.post<LeaveForm>(`${environment.apiUrl}/leaves`, leaveform);
  }

  getLeaveFormbyUser(current_user) {
    return this.http.get(`${environment.apiUrl}/leaves/${current_user}`); // returns an observable of type LeaveForm
  }

}
