import {Component, Inject} from "@angular/core";
import {Exercise, ExResult} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExerciseService} from "../../services/exercise.service";

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.dialog.html',
  styleUrls: ['./new-exercise.dialog.scss']
})

export class NewExerciseDialog {
  name: string;
  description: string;
  result: ExResult = {
    Sc: 0,
    Rx: 0,
  };

  constructor( public dialogRef: MatDialogRef<NewExerciseDialog>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private rest: ExerciseService) {}

  onSave():void {
    this.rest.add({
      name: this.name,
      description: this.description,
      result: this.result,
    }).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onCancel():void {
    this.dialogRef.close();
  }
}
