import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h1>
      page not found!
    </h1>
    <button class="btn btn-primary" routerLink="/">
        <span class="glyphicon glyphicon-arrow-left"></span>
        Goto home page
    </button>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
