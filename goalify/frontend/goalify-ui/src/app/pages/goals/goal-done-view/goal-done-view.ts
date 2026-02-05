import { Component, input, output } from '@angular/core';
import type { GoalResponse } from '../../../goals/goals.model';

@Component({
  selector: 'app-goal-done-view',
  imports: [],
  templateUrl: './goal-done-view.html',
  styles:[]
})
export class GoalDoneView {
  goals = input.required<GoalResponse[]>();
  editGoal = output<GoalResponse>();
}
