import {Component, Inject, OnInit} from '@angular/core';
import {Exercise, ExResult} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExerciseService} from "../../services/exercise.service";
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';



@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.dialog.html',
  styleUrls: ['./new-exercise.dialog.scss']
})

export class NewExerciseDialog implements OnInit {
  myControl = new FormControl();
  exNames: string[] = ['Burpee', 'Ball Slam', 'Deadlift', 'Jump Rope', 'Pull-ups', 'Running', 'Sit-ups'];
  filteredExNames: Observable<string[]>;

  name: string;
  description: string;
  result: ExResult = {
    Sc: 0,
    Rx: 0,
  };
    
  constructor( public dialogRef: MatDialogRef<NewExerciseDialog>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private rest: ExerciseService,
               private fb: FormBuilder) {}

ngOnInit() {
  this.filteredExNames = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(value => this._filter(value))
  );
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.exNames.filter(exName => exName.toLowerCase().indexOf(filterValue) === 0);
}

  onSave():void {
    this.rest.add({
      name: this.name,
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
