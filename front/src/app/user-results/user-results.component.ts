import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign, map, first, filter, isNil } from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {ExerciseService} from "../services/exercise.service";
import {Exercise, ExerciseFilter, ID, WorkoutResult} from "../models/models";
import {HttpClient} from "@angular/common/http";
import { EnterResultsComponent } from '../enter-results/enter-results.component';



@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {
  results: Array<WorkoutResult> = [];
  exerciseItem: Exercise;
  exercises: Exercise[] = [];
  userId: ID;

  columnDefs = [{
    headerName: 'Date', field: 'trainingDate', minWidth: 50
  }, {
    headerName: 'Exercise', field: 'exerciseName', minWidth: 50
  }, {
    headerName: 'Result', field: 'workoutResult', minWidth: 50
  }, {
    headerName: 'Card', field: 'cardNumber', minWidth: 50
  }];

  rowData: any;

  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Result';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(public dialog: MatDialog,
              private rest: RestService,
              private router: Router,
              private exService: ExerciseService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.userId = params.cardNumber);
    this.multi = [
      {
        name: "Individual",
        series: []
      },
      {
        name: "Club",
        series: []
      }
    ];
  }

  ngOnInit() {
    this.exService.getList().subscribe((list) => {
      this.exercises = list;
      this.loadResults();
    });
    this.displayGraphData();
  }



  filterData() {
    this.loadResults();
  }

  onAddResultClick() {
    let dialogRef = this.dialog.open(EnterResultsComponent,  {
      width: '90%',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadResults();
    });
  }

  private displayGraphData() {
    this.rest.getUserResults(this.userId).subscribe((results) => {
      const names = Object.getOwnPropertyNames(results);
      const tD = [];
      const wR = [];
      for (let i = 0; i < names.length - 1; i++) {
        tD.push(results[i].trainingDate);
        wR.push(results[i].workoutResult);
        console.log(tD);
      }

      tD.sort();

      for (let i = 0; i < tD.length - 1; i++) {
         this.multi[0].series.push({
           name: tD[i],
            value: wR[i]
          });

         this.multi = [...this.multi];

        }
    });

  console.log(this.multi);
  };

  onSelect(event) {
    console.log(event);
  }

  private loadResults() {
    return this.rest.getUserResults(this.userId, {
      exerciseId: this.exerciseItem && this.exerciseItem._id,
    }).subscribe((results) => {
      const mappedResults = this.mapResults(results);
      assign(this.results,  mappedResults);
      this.rowData = mappedResults;
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
