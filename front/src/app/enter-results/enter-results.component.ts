import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { RestService } from '../services/rest.service';
import { Exercise, UserProfile, Workout } from '../models/models';
import {MatDialog, MatDialogRef} from "@angular/material";
import {NewExerciseDialog} from "../exercises/new-exercise.dialog/new-exercise.dialog";
import {ExerciseService} from "../services/exercise.service";
import { MatIconRegistry } from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DIALOG_DATA} from "@angular/material";
import {FormControl} from "@angular/forms";
import {startWith, map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.scss']
})

export class EnterResultsComponent implements OnInit {


  Users = [];

  trainingDate: Date = new Date();
  exercise: Exercise;
  workoutType: Workout = Workout.Rx;
  workoutResult: number;
  cardNumber: string;
  exercises: Exercise[];
  filteredExercises: Observable<Exercise[]>;
  exerciseControl = new FormControl();

	constructor(public dialog: MatDialog,
	            private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private restService: RestService,
              private exService: ExerciseService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              public dialogRef: MatDialogRef<EnterResultsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {

    iconRegistry.addSvgIcon('add',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/baseline-add_circle_outline-24px.svg'));
  }

  get workoutList(): string[] {
	  return Object.values(Workout);
  }


	ngOnInit() {
		this.Users = this.usersService.userData;
		this.userService.getProfile().subscribe((profile) => {
		  this.cardNumber = profile.cardNumber;
    });
		this.loadExerciseList();
	}

  /*
	onCancel() {
	  this.router.navigateByUrl('results');
  }
  */

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

  /*
  addNewResult() {
      let dialogRef = this.dialog.open(NewResultDialogComponent, {
        width: '50%',
        data: { result: this.workoutResult }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.workoutResult = result;
    });
  }
  */

  onSaveResult():void {
    this.restService.addResult({
      trainingDate: this.trainingDate,
      exerciseId: this.exercise._id,
      workoutType: this.workoutType,
      workoutResult: this.workoutResult,
      cardNumber: this.cardNumber,
    }).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
    });

  }

  loadExerciseList() {
    this.exService.getList().subscribe((list) => {
      this.exercises = list;

      this.filteredExercises = this.exerciseControl.valueChanges
        .pipe(
          startWith<string | Exercise>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.exercises)
        );
    });
  }

  onExerciseChange(exercise: Exercise) {
    this.exercise = exercise;
  }

  private _filter(name: string): Exercise[] {
    const filterValue = name.toLowerCase();

    return this.exercises.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  /*
  viewResult() {
    this.router.navigateByUrl('/results');
  }
  */
}

