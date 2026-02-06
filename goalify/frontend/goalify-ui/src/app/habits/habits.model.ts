export interface HabitResponse {
  id: number;
  goalId: number;
  name: string;
  effortPoint: number;
  hasData: boolean;
  scheduledTime: string;
  emoji: string | null;
  recurrenceMonday : boolean;
  recurrenceTuesday : boolean;
  recurrenceWednesday : boolean;
  recurrenceThursday : boolean;
  recurrenceFriday : boolean;
  recurrenceSaturday : boolean;
  recurrenceSunday : boolean;
}

// Corps des requêtes POST et PUT
export interface CreateHabitRequest {
  goalId: number;
  name: string;
  effortPoint: number;
  hasData: boolean;
  scheduledTime: string;
  emoji: string | null;
  recurrenceMonday : boolean;
  recurrenceTuesday : boolean;
  recurrenceWednesday : boolean;
  recurrenceThursday : boolean;
  recurrenceFriday : boolean;
  recurrenceSaturday : boolean;
  recurrenceSunday : boolean;
}