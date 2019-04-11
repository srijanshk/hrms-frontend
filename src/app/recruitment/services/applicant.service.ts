import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';
import { Applicant } from '../models/applicant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  constructor(private http: HttpClient, private environment: EnvironmentUrlService) { }
  envApplicant: string = this.createCompleteRoute(this.environment.recruitmentUrl, 'applicants');

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    experience: new FormControl('', Validators.required),
    address: new FormControl(''),
    citizenship: new FormControl(''),
    documents: new FormControl(null, Validators.required),
    remarks: new FormControl(''),
    photo: new FormControl(null),
    position: new FormControl(null),
    interviewer: new FormControl(null),
    isEligible: new FormControl(null),
    status: new FormControl(null),
    appliedDate: new FormControl(null),
    rating: new FormControl(null)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      email: '',
      experience: '',
      address: '',
      citizenship: '',
      documents: '',
      remarks: '',
      photo: '',
      position: '',
      interviewer: '',
      isEligible: '',
      status: '',
      appliedDate: '',
      rating: ''
    });
  }
  private createCompleteRoute(envAddress: string, route: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getApplicants() {
    return this.http.get(`${this.envApplicant}`, this.generateHeaders());
  }

  getApplicantById(id: number) {
    return this.http.get(`${this.envApplicant}/${id}`, this.generateHeaders());
  }

  postApplicant = function (applicant: Applicant) {
    return this.http.post(`${this.envApplicant}`, applicant);
  };
  postFileApplicant = function(file: File){
    return this.http.post(`${this.environment.uploadUrl}`, file);
  }
  putApplicant = function (id: number, applicant: Applicant) {
    return this.http.put(`${this.envApplicant}/${id}`, JSON.stringify(applicant), this.generateHeaders());
  };
  deleteApplicant = function (id: number) {
    return this.http.delete(`${this.envApplicant}/${id}`, this.generateHeaders());
  };

  populateForm(applicant) {
    this.form.setValue(_.omit(applicant, ''));
  }
}