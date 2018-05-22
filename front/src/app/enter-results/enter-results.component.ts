import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from  "../user"
import { UsersService } from '../services/users.service';
import { RestService } from '../services/rest.service';
import { Exercise, Workout } from '../models/models';


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

	constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private restService: RestService) { }



  get exercises(): string[] {
	  return Object.values(Exercise);
  }

  get workoutList(): string[] {
	  return Object.values(Workout);
  }


	ngOnInit() {
		this.Users = this.usersService.userData;
	}

  onCancel() {
	  this.router.navigateByUrl('results');
  }

  onSaveResult() {
    console.log(this.trainingDate, this.exercise, this.workoutType, this.workoutResult);
    this.restService.addResult({
      trainingDate: this.trainingDate,
      exercise: this.exercise,
      workoutType: this.workoutType,
      workoutResult: this.workoutResult,
    }).subscribe((result) => {
      console.log(result);
    });
    //this.restService.saveUserData(userData);
  }
}

