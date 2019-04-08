import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionCreationModal } from './../modals/questionCreationModal';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../services/subjects/get.data.service';
 
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  public errorMessage: string = '';
  public questionForm: FormGroup;
 
  private subject: string;
  public multichoice: boolean = true;

  answers: string;
  questionType: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private questionAddService: GetDataService) { }
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subject = params.get("subject");
    });
    this.multiChoiceFormGroup();
  }

  chooseAnswerType(){
    this.multichoice = !this.multichoice;
    if(this.multichoice){
      this.multiChoiceFormGroup();
    }
    else{
      this.singleFormGroup();
    }
  }

  multiChoiceFormGroup(){
    this.questionForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      answer1: new FormControl('', [Validators.required]),
      answer2: new FormControl('', [Validators.required]),
      answer3: new FormControl('', [Validators.required]),
      answer4: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required, Validators.pattern("^[1-9][0-9]*$")])
    });
  }

  singleFormGroup(){
    this.questionForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required, Validators.pattern("^[1-9][0-9]*$")])
    });
  }
 
  public validateControl(controlName: string) {
    if (this.questionForm.controls[controlName].invalid && this.questionForm.controls[controlName].touched)
      return true;
 
    return false;
  }
 
  public hasError(controlName: string, errorName: string) {
    if (this.questionForm.controls[controlName].hasError(errorName))
      return true;
 
    return false;
  }
 
  public createQuestion(questionFormValue) {
    if (this.questionForm.valid) {
      this.executeQuestionCreation(questionFormValue);
    }
  }
 
  private executeQuestionCreation(questionFormValue) {
    if(this.multichoice){
      this.answers = questionFormValue.answer1+", "+questionFormValue.answer2+", "+questionFormValue.answer3+", "+questionFormValue.answer4;
      this.questionType = "multiple-choice";
    }
    else{
      this.answers = questionFormValue.correctAnswer;
      this.questionType = "single"
    }
    let questionCreated: QuestionCreationModal = {
      question: questionFormValue.question,
      answers: this.answers,
      correctAnswer: questionFormValue.correctAnswer,
      type: this.questionType,
      time: questionFormValue.time
    }

    this.questionAddService.createData("http://localhost:60284/addQuestion", questionCreated)
      .subscribe(
      success => {
        this.redirectToQuestionList();
      },
      error => {
        alert("something went wrong while creating!!!")
      });
  }
 
  public redirectToQuestionList(){
    this.router.navigate(['/dashboard/createAssessment/assessment', this.subject]);
  }

}