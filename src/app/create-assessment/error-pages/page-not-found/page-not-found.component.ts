import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  pageNotFound: string = "PAGE NOT FOUND!!!";
  subPageNotFound: string = "EITHER QUESTIONS ARE NOT CREATED OR SOMETHING WENT WRONG";
  constructor() { }

  ngOnInit() {
  }

}
