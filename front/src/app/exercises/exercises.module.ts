import {NewExerciseDialog} from "./new-exercise.dialog/new-exercise.dialog";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExerciseService} from "../services/exercise.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';


@NgModule({
  entryComponents: [
    NewExerciseDialog,
  ],
  declarations: [
    NewExerciseDialog
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ExerciseService,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ExercisesModule { }
