import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  results: any;

  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.rest.getResults().subscribe((results) => {
      assign(this, { results });
      console.log(results);
    })
  }

  onAddResultClick() {
    this.router.navigateByUrl('/add-result');
  }

}
