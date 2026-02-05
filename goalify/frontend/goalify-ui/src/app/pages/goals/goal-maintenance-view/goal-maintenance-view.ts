import { Component, input, output } from '@angular/core';
import type { GoalResponse } from '../../../goals/goals.model';

@Component({
  selector: 'app-goal-maintenance-view',
  imports: [],
  templateUrl: './goal-maintenance-view.html',
  styles:[]
})
export class GoalMaintenanceView {
  goals = input.required<GoalResponse[]>();
  editGoal = output<GoalResponse>();
}
