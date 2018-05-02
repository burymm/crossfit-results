import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutResult } from '../models/models';
import { Observable } from 'rxjs/Observable';

const url = 'http://127.0.0.1:3000';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {

  }

  getResults() {
    return this.http.get(`${url}/results`);
  }

  addResult(result: WorkoutResult) {
    return this.http.post(
      `${url}/results`,
      result,
    );
  }

}
