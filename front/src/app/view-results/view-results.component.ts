import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { assign } from 'lodash';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material";
import {EnterResultsComponent} from "../enter-results/enter-results.component";
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../models/models";

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  results: any;
  exercises: Exercise[] = [];

  constructor(public dialog: MatDialog,
              private rest: RestService,
              private router: Router,
              private exService: ExerciseService,) { }

  ngOnInit() {
    Promise.all([this.loadResults(), this.loadExercises()]).then((data) => {
      console.log(data);
    });
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

  private loadResults() {
    return this.rest.getResults().subscribe((results) => {
      assign(this, { results });
    });
  }

  private loadExercises() {
    return this.exService.getList().subscribe((list) => {
      this.exercises = list;
    });
  }

}
