import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
   constructor(private http: HttpClient, private environment: EnvironmentUrlService) { }
   envPosition: string = this.createCompleteRoute(this.environment.recruitmentUrl,'positions');

   form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    status: new FormControl(''),
    requiredExperience: new FormControl('', Validators.required),
    noOfApplicants: new FormControl('', Validators.required),
    applyingForPosition: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      title: '',
      status: '',
      requiredExperience: '',
      noOfApplicants: '',
      applyingForPosition: '',
      startDate: '',
      endDate: '',
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

getPositions(){
  return this.http.get(`${this.envPosition}`,this.generateHeaders());
}

getPositionById(id: string){
  return this.http.get(`${this.envPosition}/${id}`,this.generateHeaders());
}

postPosition = function(position: Position) {
  return this.http.post(`${this.envPosition}`, position);
};
putPosition = function(id: string, position: Position){
  return this.http.put(`${this.envPosition}/${id}`, JSON.stringify(position), this.generateHeaders());
};
deletePosition = function(id: string){
  return this.http.delete(`${this.envPosition}/${id}`, this.generateHeaders());
};

populateForm(position){
  this.form.setValue(_.omit(position,''));
}
}