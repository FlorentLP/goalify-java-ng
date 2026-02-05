import { Component, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoalResponse } from '../../../goals/goals.model';

@Component({
  selector: 'app-goal-todo-view',
  imports: [],
  templateUrl: './goal-todo-view.html',
  styles: []
})
export class GoalTodoView {
  private sanitizer = inject(DomSanitizer);

  goals = input.required<GoalResponse[]>();
  editGoal = output<GoalResponse>();

  getGoalImageUrl(goal: GoalResponse): string | SafeResourceUrl {
    if (goal.image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(goal.image);
    }
    const base = 'https://placehold.co/400x240';
    const colors: Record<string, string> = {
      HEALTH: 'b8c9ac/ffffff',
      SOCIAL: 'a8b8c8/ffffff',
      INTELLECT: 'c4b8d4/ffffff',
      AESTHETIC: 'e0b8b8/ffffff',
      MINDSET: 'e0b8a8/ffffff',
      OTHER: 'c4b8a8/ffffff'
    };
    const color = colors[goal.goalCategory] ?? 'c4b8a8/ffffff';
    return `${base}/${color}?text=${encodeURIComponent(goal.name)}`;
  }
}
