export enum Workout { Rx = 'Rx', Sc = 'Scalable' }
export type ID = string;

export type ExResult = {
  Rx: number;
  Sc: number;
}

export type Exercise = {
  _id: ID;
  name: string;
  result: ExResult;
  description?: string;
};
export type WorkoutResult = {
  cardNumber: string;
  trainingDate: Date;
  exerciseId: ID;
  workoutType: Workout;
  workoutResult: number;
  comment?: string;
};

