export enum Workout { Rx = 'Rx', Sc = 'Scalable' }
export type ID = string;

export type ExerciseFilter = {
  exerciseId?: ID;
}

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

export type UserProfile = {
  name: string;
  email: string;
  picture: string;
  id: string;
}

