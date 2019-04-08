import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  total: any = 0;
  ngOnInit() {
    // if(this.route.snapshot.queryParamMap.has('total')){
    //   this.total = this.route.snapshot.queryParamMap.get('total');
    // }
    this.route.queryParamMap.subscribe((queryParams) => {
      if(queryParams.has('total')){
        this.total = queryParams.get('total')
      }else{
        this.total = 0
      }
    })
  }
}
