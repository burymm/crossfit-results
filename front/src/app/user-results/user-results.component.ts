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
  }];

  rowData: any;

  multi: any[] = [
    {
      name: "Individual",
      series:[]
    },
    {
      name: "Club",
      series:[]
    }
  ];

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
  }

  ngOnInit() {
    this.exService.getList().subscribe((list) => {
      this.exercises = list;
      this.loadResults();
    });
    this.rowData = this.rest.getUserResults(this.userId);
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
      this.rowData = this.rest.getUserResults(this.userId);
    });
  }

  displayGraphData() {
    return this.rest.getUserResults(this.userId).subscribe((results) => {
      console.log(results);
      this.results.forEach((elememt) => {
        this.multi.push({"name": elememt.trainingDate, "value": elememt.workoutResult});
      })
    })
  };

  onSelect(event) {
    console.log(event);
  }
  
  private loadResults() {
    return this.rest.getUserResults(this.userId, {
      exerciseId: this.exerciseItem && this.exerciseItem._id,
    }).subscribe((results) => {
      assign(this, { results: this.mapResults(results) } );
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
