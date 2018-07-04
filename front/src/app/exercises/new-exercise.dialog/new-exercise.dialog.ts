import {Component, Inject, OnInit} from '@angular/core';
import {Exercise, ExResult} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExerciseService} from "../../services/exercise.service";
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface ExGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.dialog.html',
  styleUrls: ['./new-exercise.dialog.scss']
})

export class NewExerciseDialog implements OnInit {
  
  exForm: FormGroup = this.fb.group({
    exGroup: '',
  });
  name: string;
  description: string;
  result: ExResult = {
    Sc: 0,
    Rx: 0,
  };
  exGroups: ExGroup[] = [{
    letter: 'B',
    names: ['Burpee', 'Ball Slam']
  }, {
    letter: 'D',
    names: ['Deadlift']
  }, {
    letter: 'J',
    names: ['Jump Rope']
  }, {
    letter: 'P',
    names: ['Pull-ups']
  }, {
    letter: 'R',
    names: ['Running']
  }, {
    letter: 'S',
    names: ['Sit-ups']
  }];

  exGroupOptions: Observable<ExGroup[]>;

  constructor( public dialogRef: MatDialogRef<NewExerciseDialog>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private rest: ExerciseService,
               private fb: FormBuilder) {}

ngOnInit() {
this.exGroupOptions = this.exForm.get('exGroup')!.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filterGroup(value))
  );
}

private _filterGroup(value: string): ExGroup[] {
    if (value) {
      return this.exGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.exGroups;
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
