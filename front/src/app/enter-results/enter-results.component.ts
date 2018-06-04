import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from  "../user"
import { UsersService } from '../services/users.service';
import { RestService } from '../services/rest.service';
import { Exercise, Workout } from '../models/models';
import {MatDialog} from "@angular/material";
import {NewExerciseDialog} from "../exercises/new-exercise.dialog/new-exercise.dialog";
import {ExerciseService} from "../services/exercise.service";


@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.scss']
})

export class EnterResultsComponent implements OnInit {

  Users = [];

  trainingDate: Date;
  exercise: Exercise;
  workoutType: Workout = Workout.Rx;
  workoutResult: number;
  cardNumber: string;
  exercises: Exercise[] = [];

	constructor(public dialog: MatDialog,
	            private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private restService: RestService,
              private exService: ExerciseService) { }

  get workoutList(): string[] {
	  return Object.values(Workout);
  }


	ngOnInit() {
		this.Users = this.usersService.userData;
		this.loadExerciseList();
	}

  onCancel() {
	  this.router.navigateByUrl('results');
  }

  addNewExercise() {
	  let dialogRef = this.dialog.open(NewExerciseDialog,  {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadExerciseList();
    });
  }

  onSaveResult() {
    this.restService.addResult({
      trainingDate: this.trainingDate,
      exerciseId: this.exercise._id,
      workoutType: this.workoutType,
      workoutResult: this.workoutResult,
      cardNumber: this.cardNumber,
    }).subscribe((result) => {
      console.log(result);
    });
  }

  loadExerciseList() {
    this.exService.getList().subscribe((list) => {
      this.exercises = list;
    })
  }

  viewResult() {
    this.router.navigateByUrl('/results');
  }
}

