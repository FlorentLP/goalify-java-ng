export type GoalStatus = 'TODO' | 'ONGOING' | 'MAINTENANCE' | 'DONE';
export type GoalType = 'LIFETIME' | 'ONETIME';
export type GoalCategory = 'HEALTH' | 'SOCIAL' | 'INTELLECT' | 'AESTHETIC' | 'MINDSET' | 'OTHER';

export interface GoalResponse {
  id: number;
  name: string;
  goalStatus: GoalStatus;
  goalType: GoalType;
  goalCategory: GoalCategory;
  priority: number;
  image: string | null;
  daysNeeded : number | null;
  effortsNeeded : number | null;
}

export interface CreateGoalRequest {
  name: string;
  goalStatus: GoalStatus;
  goalType: GoalType;
  goalCategory: GoalCategory;
  priority: number;
  image: string | null;
  daysNeeded : number | null;
  effortsNeeded : number | null;
}