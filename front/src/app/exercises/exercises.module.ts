import {NewExerciseDialog} from "./new-exercise.dialog/new-exercise.dialog";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ExerciseService} from "../services/exercise.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  entryComponents: [
    NewExerciseDialog,
  ],
  declarations: [
    NewExerciseDialog,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ExerciseService,
  ],
})
export class ExercisesModule { }
