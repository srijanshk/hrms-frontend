import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assessment } from '../models/assessment-model';
import { QuestionAnswerModel } from '../models/question-answer-model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  questions :Assessment[];

  
  constructor(private http: HttpClient) { }

  loadData(url: string){
    return this.http.get(url);
  }

  getData() {
    return this.questions;
  }

}