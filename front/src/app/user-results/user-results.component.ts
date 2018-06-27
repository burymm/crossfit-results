import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign, map, first, filter, isNil } from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {ExerciseService} from "../services/exercise.service";
import {Exercise, ID} from "../models/models";

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {
  results: any;
  exerciseItem: Exercise;
  exercises: Exercise[] = [];
  userId: ID;

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
    })
  }

  filterData() {
    this.loadResults();
  }

  private loadResults() {
    return this.rest.getUserResults(this.userId, {
      exerciseId: this.exerciseItem && this.exerciseItem._id,
    }).subscribe((results) => {
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
