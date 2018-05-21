import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Exercise, WorkoutResult} from "../models/models";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExerciseService {
  constructor(private http: HttpClient) {

  }

  getList(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`/exercises`);
  }

  add(result: Exercise) {
    return this.http.post(
      `/exercises`,
      result,
    );
  }
}
