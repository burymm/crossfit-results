import {Component, Inject, OnInit} from '@angular/core';
import {Exercise, ExResult} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExerciseService} from "../../services/exercise.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.dialog.html',
  styleUrls: ['./new-exercise.dialog.scss']
})

export class NewExerciseDialog implements OnInit {

  result: ExResult = {
    Sc: 0,
    Rx: 0,
  };
  
  exerciseForm: FormGroup;

  exercise: Exercise;

  constructor( public dialogRef: MatDialogRef<NewExerciseDialog>,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private rest: ExerciseService) {}

ngOnInit() {
  this.exerciseForm = this.formBuilder.group({
    exerciseName: [null, [Validators.required]],
    description: [null, []],
    rxResult: [null, []],
    scResult: [null, []],
  });
  
}

  onSave():void {
    if (!this.exerciseForm.valid) {
      return;
    }
    this.rest.add({
      name: this.exerciseForm.get('exerciseName').value,
      description: this.exerciseForm.get('description').value,
      result: <ExResult>{
        Rx: this.exerciseForm.get('rxResult').value,
        Sc: this.exerciseForm.get('scResult').value,
      },
      _id: void 0,
    }).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onCancel():void {
    this.dialogRef.close();
  }

}
