import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionUpdateModal } from './../modals/questionUpdateModal';
import { GetDataService } from '../services/subjects/get.data.service'


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  subject: string;
  questionId: number;
  updateQuestionForm: FormGroup;
  multichoice: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: GetDataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subject = params.get("subject")
      let question = JSON.parse(params.get("question")) as QuestionUpdateModal;
      this.questionId = question.questionId;
      if(question.type == "multiple-choice"){
        this.multichoice = true;
        this.multiChoiceFormGroup(question);
      }
      else{
        this.singleFormGroup(question);
      }
    });
  }

  multiChoiceFormGroup(question: QuestionUpdateModal){
    let answers = question.answers.split(",")
    this.updateQuestionForm = new FormGroup({
      question: new FormControl(question.question, [Validators.required]),
      answer1: new FormControl(answers[0], [Validators.required]),
      answer2: new FormControl(answers[1], [Validators.required]),
      answer3: new FormControl(answers[2], [Validators.required]),
      answer4: new FormControl(answers[3], [Validators.required]),
      correctAnswer: new FormControl(question.correctAnswer, [Validators.required]),
      time: new FormControl(question.time, [Validators.required, Validators.pattern("^[1-9][0-9]*$")])
    });
  }

  singleFormGroup(question: QuestionUpdateModal){
    this.updateQuestionForm = new FormGroup({
      question: new FormControl(question.question, [Validators.required]),
      correctAnswer: new FormControl(question.correctAnswer, [Validators.required]),
      time: new FormControl(question.time, [Validators.required, Validators.pattern("^[1-9][0-9]*$")])
    });
  }
 
  public validateControl(controlName: string) {
    if (this.updateQuestionForm.controls[controlName].invalid && this.updateQuestionForm.controls[controlName].touched)
      return true;
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.updateQuestionForm.controls[controlName].hasError(errorName))
      return true;
 
    return false;
  }
 
  public updatedQuestion(questionFormValue) {
    if (this.updateQuestionForm.valid) {
      this.executeQuestionCreation(questionFormValue);
    }
  }
 
  private executeQuestionCreation(questionFormValue) {
    let answers: string = "";
    let questionType: string = "";
    if(this.multichoice){
      answers = questionFormValue.answer1+", "+questionFormValue.answer2+", "+questionFormValue.answer3+", "+questionFormValue.answer4;
      questionType = "multiple-choice";
    }
    else{
      answers = questionFormValue.correctAnswer;
      questionType = "single";
    }
    let questionUpdated: QuestionUpdateModal = {
      questionId: this.questionId,
      question: questionFormValue.question,
      answers: answers,
      correctAnswer: questionFormValue.correctAnswer,
      type: questionType,
      time: questionFormValue.time
    }
    this.questionService.updateData("http://localhost:60284/updateQuestion", questionUpdated)
      .subscribe(
      success => {
        this.redirectToQuestionList();
      },
      error => {
        alert("something went wrong while creating!!!")
      });
  }
 
  public redirectToQuestionList(){
    this.router.navigate(['/assessment', this.subject]);
  }

}
