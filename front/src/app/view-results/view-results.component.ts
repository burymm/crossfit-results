import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign } from 'lodash';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material";
import {EnterResultsComponent} from "../enter-results/enter-results.component";

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  results: any;

  constructor(private rest: RestService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.rest.getResults().subscribe((results) => {
      assign(this, { results });
      console.log(results);
    })
  }

  onAddResultClick() {
    let dialogRef = this.dialog.open(EnterResultsComponent,  {
      width: '90%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
