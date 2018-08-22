import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign, map, first, filter, isNil } from 'lodash';
import { Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {EnterResultsComponent} from "../enter-results/enter-results.component";
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../models/models";
import { ResultsService } from '../services/results.service';
import {CellClickedEvent} from "ag-grid";
import {a} from "@angular/core/src/render3";


@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  results: any;
  exercises: Exercise[] = [];

  columnDefs = [
    {headerName: 'Date', field: 'trainingDate', minWidth: 50},
    {headerName: 'Card Number', field: 'cardNumber', minWidth: 50, cellRenderer: function (params) {
      return '<a href="/results/:cardNumber" style="text-decoration: none; color: white;">'+ params.value+'</a>';
    }},
    {headerName: 'Exercise', field: 'exerciseName', minWidth: 50},
    {headerName: 'Result', field: 'workoutResult', minWidth: 50}
  ];

  rowData: any;

  constructor(public dialog: MatDialog,
              private rest: RestService,
              private router: Router,
              private exService: ExerciseService,
              private resultsService: ResultsService) { }

  ngOnInit() {
   this.exService.getList().subscribe((list) => {
      this.exercises = list;
      this.loadResults();
    });
   this.rowData = this.resultsService.getResults();
  }

  onAddResultClick() {
    let dialogRef = this.dialog.open(EnterResultsComponent,  {
      width: '90%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadResults();
    });
  }

  // showUserResult(cardNumber: string) {
  //   if (!cardNumber) {
  //     return;
  //   }
  //
  //   this.router.navigate([`/results/`, cardNumber]);
  // }

  private loadResults() {
    return this.rest.getResults().subscribe((results) => {
      assign(this, { results: this.mapResults(results) });
    });
  }

  private mapResults(results) {
    return map(results, (result) => {
      const exercise = first(filter(this.exercises, (exercese) => {
        return exercese._id === result.exerciseId;
      }));

      if (!isNil(exercise)) {
        result.exercise = {};
        assign(result.exercise, exercise);
      }
      return result;
    });
  }


}
