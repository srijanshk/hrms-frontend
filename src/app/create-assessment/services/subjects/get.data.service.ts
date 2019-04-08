import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { QuestionCreationModal } from '../../modals/questionCreationModal';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private httpService: HttpClient) { }

  getData(url: string){
    return this.httpService.get(url);
  }

  getOneData(url: string){
    return this.httpService.get(url, this.generateHeaders());
  }

  createData(url: string, question: QuestionCreationModal){
    return this.httpService.post(url, question, this.generateHeaders());
  }

  deleteData(url: string, question: QuestionCreationModal){
    return this.httpService.post(url, question, this.generateHeaders());
  }

  updateData(url: string, question: QuestionCreationModal){
    return this.httpService.post(url, question, this.generateHeaders());
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
