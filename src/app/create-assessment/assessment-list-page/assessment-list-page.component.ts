import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/subjects/get.data.service';
import { QuestionListModal } from '../modals/questionListModal';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCreationModal } from '../modals/questionCreationModal';

@Component({
  selector: 'app-assessment-list-page',
  templateUrl: './assessment-list-page.component.html',
  styleUrls: ['./assessment-list-page.component.css']
})
export class AssessmentListPageComponent implements OnInit {

  subject = '';
  questions: QuestionListModal = new QuestionListModal(null);
  errorMessage = '';
  createMessage = 'You can create a new question';
  totalQuestions: number;

  constructor(private route: ActivatedRoute, private router: Router, private questionListService: GetDataService) { }

  ngOnInit() {
    this.getSubjectData();
  }

  getSubjectData() {
    this.route.paramMap.subscribe(data => {
      this.subject = data.get('subject');
      // this.questionListService.getData("../assets/"+this.subject+".json")     //this is when reading fron assets json file
      // todo pass the subject to database for filtering questions
      this.questionListService.getData('http://localhost:60284/api/Question')
      .subscribe(json => {
        this.questions = new QuestionListModal(json);
        this.totalQuestions = this.questions.questions.length;
      },
      error => {
        this.totalQuestions = 0;
        this.errorMessage = 'Either Questions are not created or something went wrong';
      });
    });
  }

  setSubject(subject: string) {
    this.subject = subject;
  }

  updateQuestion(question: QuestionCreationModal) {
    this.router.navigate(['/update', this.subject, JSON.stringify(question)]);
  }

  deleteQuestion(question: QuestionCreationModal) {
    this.questionListService.deleteData('http://localhost:60284/removeQuestion', question)
      .subscribe(
      success => {
        this.getSubjectData();
      },
      error => {
        alert('something went wrong while deleting!!!');
      });
  }

}
