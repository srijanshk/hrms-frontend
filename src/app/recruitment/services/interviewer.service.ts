import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';
import { Interviewer } from '../models/interviewer';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {
   constructor(private http: HttpClient, private environment: EnvironmentUrlService) { }
   envInterviewer: string = this.createCompleteRoute(this.environment.recruitmentUrl,'interviewers');

   form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    personalDetails: new FormControl(''),
    dueDate: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      personalDetails: '',
      dueDate: '',
    });
  }
   private createCompleteRoute(envAddress: string, route: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

getInterviewers(){
  return this.http.get(`${this.envInterviewer}`,this.generateHeaders());
}

getInterviewerById(id: number){
  return this.http.get(`${this.envInterviewer}/${id}`,this.generateHeaders());
}

postInterviewer = function(interviewer: Interviewer) {
  return this.http.post(`${this.envInterviewer}`, interviewer);
};
putInterviewer = function(id: number, interviewer: Interviewer){
  return this.http.put(`${this.envInterviewer}/${id}`, JSON.stringify(interviewer), this.generateHeaders());
};
deleteInterviewer = function(id: number){
  return this.http.delete(`${this.envInterviewer}/${id}`, this.generateHeaders());
};

populateForm(interviewer){
  this.form.setValue(_.omit(interviewer,''));
}
}