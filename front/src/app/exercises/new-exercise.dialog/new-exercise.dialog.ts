import {Component, Inject, OnInit} from '@angular/core';
import {Exercise, ExResult} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExerciseService} from "../../services/exercise.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';



@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.dialog.html',
  styleUrls: ['./new-exercise.dialog.scss']
})

export class NewExerciseDialog implements OnInit {

  // name: string;
  description: string;
  result: ExResult = {
    Sc: 0,
    Rx: 0,
  };

  myControl = new FormControl();
  //exNames: string[] = ['Burpee', 'Ball Slam', 'Deadlift', 'Jump Rope', 'Pull-ups', 'Running', 'Sit-ups'];
  exercise: Exercise;
  exNames: Exercise[];
  filteredExNames: Observable<Exercise[]>;

  constructor( public dialogRef: MatDialogRef<NewExerciseDialog>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private rest: ExerciseService) {}

ngOnInit() {
    this.loadExList();
  // this.filteredExNames = this.myControl.valueChanges
  //   .pipe(
  //   startWith(''),
  //   map(value => this._filter(value))
  // );
}

  loadExList() {
    this.rest.getList().subscribe((list) => {
      this.exNames = list;

      this.filteredExNames = this.myControl.valueChanges
        .pipe(
          startWith<string | Exercise>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.exNames)
        );
    });
  }

private _filter(name: string): Exercise[] {
  const filterValue = name.toLowerCase();
  return this.exNames.filter(exName => exName.name.toLowerCase().includes(filterValue));
}

  onSave():void {
    this.rest.add({
      name: this.exercise.name,
      description: this.description,
      result: this.result,
      _id: void 0,
    }).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onCancel():void {
    this.dialogRef.close();
  }

}
