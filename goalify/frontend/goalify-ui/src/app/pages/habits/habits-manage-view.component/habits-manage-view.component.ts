import { Component, inject, input, OnInit, signal } from '@angular/core';
import { HabitResponse } from '../../../habits/habits.model';
import { AddFabComponent } from '../../../core/add-fab.component/add-fab.component';
import { GoalResponse } from '../../../goals/goals.model';
import { GoalsService } from '../../../goals/goals.service';

@Component({
  selector: 'app-habits-manage-view',
  imports: [AddFabComponent],
  standalone:true,
  templateUrl: './habits-manage-view.component.html',
  styles: []
})
export class HabitsManageViewComponent implements OnInit{
  private goalsService = inject(GoalsService);

  habits = input.required<HabitResponse[]>();

  goals = signal<GoalResponse[]>([]);
  goalsloading = signal<boolean>(false);
  goalserror = signal<string|null>(null);
  
  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(){
    this.goalsloading.set(true);
    this.goalserror.set(null);
    this.goalsService.getGoals().subscribe({
      next: (list) => {
        this.goals.set(list);
        this.goalsloading.set(false);
      },
      error: (err) => {
        this.goalserror.set(err.error?.message ?? 'Error while loading the goals');
        this.goalsloading.set(false);
      }
    });
  };
}
