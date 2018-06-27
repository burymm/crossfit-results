import { Injectable } from '@angular/core';
import {UsersService} from "./users.service";
import { ResultsService } from './results.service';
import {ExerciseFilter, ID, WorkoutResult} from '../models/models';


@Injectable()
export class RestService {

  constructor(private usersService: UsersService,
              private resultsService: ResultsService) {

  }

  saveUserData(userData){
    this.usersService.addUserData(userData.id, userData.name);
  }

  getResults() {
    return this.resultsService.getResults();
  }

  getUserResults(userId: ID, filter?: ExerciseFilter) {
    return this.resultsService.getUserResults(userId, filter);
  }

  addResult(result: WorkoutResult) {
    return this.resultsService.addResult(result);
  }



}

