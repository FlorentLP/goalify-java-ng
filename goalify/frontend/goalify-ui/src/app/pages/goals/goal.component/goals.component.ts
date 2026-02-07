import { Component, OnInit, inject, signal } from '@angular/core';
import { GoalsService } from '../../../goals/goals.service';
import type { GoalResponse } from '../../../goals/goals.model';
import { GoalOngoingView } from '../goal-ongoing-view/goal-ongoing-view';
import { GoalTodoView } from '../goal-todo-view/goal-todo-view';
import { GoalMaintenanceView } from '../goal-maintenance-view/goal-maintenance-view';
import { GoalDoneView } from '../goal-done-view/goal-done-view';
import { FilterPillsComponent, GoalStatus } from '../../../core/filter-pills.component/filter-pills.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [
    GoalOngoingView,
    GoalTodoView,
    GoalMaintenanceView,
    GoalDoneView,
    FilterPillsComponent
  ],
  templateUrl: './goals.component.html',
  styles: []
})
export class GoalsComponent implements OnInit {
  private goalsService = inject(GoalsService);

  goals = signal<GoalResponse[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  filterStatus = signal<GoalStatus>('TODO');


  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.loading.set(true);
    this.error.set(null);
    this.goalsService.getGoals(this.filterStatus()).subscribe({
      next: (list) => {
        const sorted = [...list].sort((a, b) => {
          if (b.priority !== a.priority) return b.priority - a.priority;
          return a.name.localeCompare(b.name);
        });
        this.goals.set(sorted);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Error while loading the goals');
        this.loading.set(false);
      }
    });
  }

  setFilter(status: string): void {
    this.filterStatus.set(status as GoalStatus);
    this.loadGoals();
  }
}