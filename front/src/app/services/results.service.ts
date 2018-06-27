import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ExerciseFilter, ID, WorkoutResult} from '../models/models';
import { pickBy } from 'lodash';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {

  }

  getResults() {
    return this.http.get(`/results`);
  }

  getUserResults(userId: ID, filter?: ExerciseFilter) {
    return this.http.get(`/results/${userId}`, { params: pickBy(filter) });
  }

  addResult(result: WorkoutResult) {
    return this.http.post(
      `/results`,
      result,
    );
  }

}
