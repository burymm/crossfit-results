import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign } from 'lodash';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  results: any;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.rest.getResults().subscribe((results) => {
      assign(this, { results });
      console.log(results);
    })
  }

}
