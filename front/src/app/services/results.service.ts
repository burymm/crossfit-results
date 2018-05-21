import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutResult } from '../models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {

  }

  getResults() {
    return this.http.get(`/results`);
  }

  addResult(result: WorkoutResult) {
    return this.http.post(
      `/results`,
      result,
    );
  }

}
