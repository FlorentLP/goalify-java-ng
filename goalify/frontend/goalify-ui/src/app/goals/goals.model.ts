// Enums alignés avec le backend Java
export type GoalStatus = 'TODO' | 'ONGOING' | 'MAINTENANCE' | 'DONE';
export type GoalType = 'LIFETIME' | 'ONETIME';
export type GoalCategory = 'HEALTH' | 'SOCIAL' | 'INTELLECT' | 'AESTHETIC' | 'MINDSET' | 'OTHER';

// Réponse API (GET goals, GET goal/{id}, POST, PUT)
export interface GoalResponse {
  id: number;
  name: string;
  goalStatus: GoalStatus;
  goalType: GoalType;
  goalCategory: GoalCategory;
  priority: number;
  image: string | null;
}

// Corps des requêtes POST et PUT
export interface CreateGoalRequest {
  name: string;
  goalStatus: GoalStatus;
  goalType: GoalType;
  goalCategory: GoalCategory;
  priority: number;
  image: string | null;
}