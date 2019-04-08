import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
import {Assessment} from '../models/assessment-model';
import { QuestionComponent } from '../question/question.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css'],
  providers: [AssessmentService]
})
export class AssessmentComponent implements OnInit {
  assessment : Assessment = new Assessment(null);
 
  index : number = 0;
  numberOfQuestionsPerPage : number = 1;
  totalQuestions : number = 0;

  constructor(private assessmentService: AssessmentService, 
              private route: ActivatedRoute, 
              private router: Router) 
            { }

  ngOnInit() {
    this.assessmentService.loadData('../../../assets/question_answer.json')
      .subscribe(result => {
        this.assessment = new Assessment(result);
        this.totalQuestions = this.assessment.questionAnswers.length;
      });
    } 

  get filteredQuestions(){
    if(this.assessment.questionAnswers !== undefined){
    return this.assessment.questionAnswers.slice(this.index, this.index + this.numberOfQuestionsPerPage);
    }
  }

  total: number = 0
  count: number = 0;
  NextButtonAvailable: number = 1; // 0 means next button is disabled and vice-versa.

  next(index : number, action?: string){
    this.NextButtonAvailable = 1;
    if (action === 'next') {
      if(this.count === 1 && this.NextButtonAvailable === 1){
        this.total += 1
        this.count = 0
      }else{
        this.count = 0
      }
    }else{
      this.count = 0
    }

    
    if(index >= 0 && index < this.totalQuestions - 1){
      this.index = index + 1; 
    }else{
      this.onSubmit()
    }
  }

  receiveMessage($count) {
    this.count = $count
  }

  timerFinished: number = null;
  receiveTime($timerFinished) {
    this.timerFinished = $timerFinished
    if (this.timerFinished === 1) {
      this.NextButtonAvailable = 0;
      console.log("Time has finished.")
    }
  }

  onSubmit(){
    // call component
    this.router.navigate(['/dashboard/takeAssessment/submit'], {queryParams: {total: this.total}});
  }
}
 