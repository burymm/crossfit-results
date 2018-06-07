import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-result-dialog',
  templateUrl: './new-result-dialog.component.html',
  styleUrls: ['./new-result-dialog.component.scss']
})
export class NewResultDialogComponent {

  result: number;

  constructor(public dialogRef: MatDialogRef<NewResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


}
