import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';
import { Applicant } from '../models/applicant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
   constructor(private http: HttpClient, private environment: EnvironmentUrlService) { }
   envApplicant: string = this.createCompleteRoute(this.environment.recruitmentUrl,'applicants');

   form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    applyingFor: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    stage: new FormControl('',Validators.required),
    resume: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl(null,Validators.required),
    appliedDate: new FormControl('',Validators.required),
    remarks: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
    id: null,
    name: '',
    applyingFor: '',
    description: '',
    stage: '',
    resume: '',
    email: '',
    phone: '',
    appliedDate: '',
    remarks: ''
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

getApplicants(){
  return this.http.get(`${this.envApplicant}`,this.generateHeaders());
}

getApplicantById(id: number){
  return this.http.get(`${this.envApplicant}/${id}`,this.generateHeaders());
}

postApplicant = function(applicant: Applicant) {
  return this.http.post(`${this.envApplicant}`, applicant);
};
putApplicant = function(id: number, applicant: Applicant){
  return this.http.put(`${this.envApplicant}/${id}`, JSON.stringify(applicant), this.generateHeaders());
};
deleteApplicant = function(id: number){
  return this.http.delete(`${this.envApplicant}/${id}`, this.generateHeaders());
};

populateForm(applicant){
  this.form.setValue(_.omit(applicant,''));
}
}