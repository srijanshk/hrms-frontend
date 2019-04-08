import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionAnswerModel } from '../models/question-answer-model';
import { Time } from '@angular/common';
//import { AssessmentComponent } from '../assessment/assessment.component'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  selectedAnswer : string = null;
  correctAnswer : string = null;
  duration : number = 0;
  time: number = 0;
  count: number = 0; 
  timerFinished: number = 0; // 0 means questions has time,
  
  @Input() question : QuestionAnswerModel;
  @Input() totalQuestions: number;
  @Output() messageEvent = new EventEmitter<number>();
  @Output() timeEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.time = this.question.time;
    setInterval(() => { this.timer(); }, 1000);
  }

  onSelect(answer: string, correctAnswer: string){
    this.selectedAnswer = answer;
    this.correctAnswer = correctAnswer;
    if (answer === correctAnswer) {
        this.count = 1
    }else{
      this.count = 0    
    }
    //send this data to parent class
    this.messageEvent.emit(this.count);
  }

  isAnswered() {
    return this.selectedAnswer != null;
  }

  isCorrect() {
    return this.selectedAnswer == this.correctAnswer;
  }

  onexit: number = 1;
  timer(){
      this.time = this.time -1
      if (this.time <= 0) {
        // redirect to next question.
        if(this.onexit == 1){
          this.timerFinished = 1
          this.timeEvent.emit(this.timerFinished);
          this.onexit = 0
        }
        this.time = 0
      }
  }

  result(){
    return this.count
  }
}
