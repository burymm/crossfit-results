import {NewExerciseDialog} from "./new-exercise.dialog/new-exercise.dialog";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ExerciseService} from "../services/exercise.service";

@NgModule({
  entryComponents: [
    NewExerciseDialog,
  ],
  declarations: [
    NewExerciseDialog,
  ],
  imports: [
    FormsModule,
  ],
  providers: [
    ExerciseService,
  ],
})
export class ExercisesModule { }
