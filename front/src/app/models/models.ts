export enum Workout { Rx = 'Rx', Sc = 'Scalable' };
export enum Exercise { Type1 = 'Type1', Type2 = 'Type2' };
export type WorkoutResult = {
  trainingDate: Date;
  exercise: Exercise;
  workoutType: Workout;
  workoutResult: number;
  comment?: string;
};
