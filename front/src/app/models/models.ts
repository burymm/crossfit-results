export enum Workout { Rx = 'Rx', Sc = 'Scalable' };

export type ExResult = {
  Rx: number;
  Sc: number;
}

export type Exercise = {
  name: string;
  result: ExResult;
  description?: string;
};
export type WorkoutResult = {
  trainingDate: Date;
  exercise: Exercise;
  workoutType: Workout;
  workoutResult: number;
  comment?: string;
};

