import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {

  }

  getResults() {
    return this.http.get('http://127.0.0.1:3000/results');
  }

}
