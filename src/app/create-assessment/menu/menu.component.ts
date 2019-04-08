import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/subjects/get.data.service';
import { SubjectModal } from '../modals/subjectModal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  subjects : SubjectModal = new SubjectModal(null);

  constructor(private activeRoute: ActivatedRoute, private router: Router, private subjectService: GetDataService) { }

  ngOnInit() {
    this.subjectService.getData("../../../assets/subjects.json")
    .subscribe(json => {
      this.subjects = new SubjectModal(json)
    });
  }

  onSelectedSubject(subject: string){
    
  }

}
