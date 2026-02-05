import { Component, OnInit, inject, signal } from '@angular/core';
import { GoalsService } from '../../goals/goals.service';
import type { GoalResponse, GoalStatus, CreateGoalRequest } from '../../goals/goals.model';
import { GoalFormModalComponent } from './goal-form-modal/goal-form-modal.component';
import { GoalOngoingView } from './goal-ongoing-view/goal-ongoing-view';
import { GoalTodoView } from './goal-todo-view/goal-todo-view';
import { GoalMaintenanceView } from './goal-maintenance-view/goal-maintenance-view';
import { GoalDoneView } from './goal-done-view/goal-done-view';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [GoalFormModalComponent,
    GoalOngoingView,
    GoalTodoView,
    GoalMaintenanceView,
    GoalDoneView,],
  templateUrl: './goals.component.html',
  styles: []
})
export class GoalsComponent implements OnInit {
  private goalsService = inject(GoalsService);

  goals = signal<GoalResponse[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  filterStatus = signal<GoalStatus>('TODO');

  modalOpen = signal<'create' | 'edit' | null>(null);
  goalToEdit = signal<GoalResponse | null>(null);
  modalError = signal<string | null>(null);

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

  setFilter(status: GoalStatus): void {
    this.filterStatus.set(status);
    this.loadGoals();
  }

  openCreateModal(): void {
    this.goalToEdit.set(null);
    this.modalError.set(null);
    this.modalOpen.set('create');
  }

  openEditModal(goal: GoalResponse): void {
    this.goalToEdit.set(goal);
    this.modalError.set(null);
    this.modalOpen.set('edit');
  }

  closeModal(): void {
    this.modalOpen.set(null);
    this.goalToEdit.set(null);
    this.modalError.set(null);
  }

  onModalSaved(payload: CreateGoalRequest): void {
    const id = this.goalToEdit()?.id;
    const req = id
      ? this.goalsService.updateGoal(id, payload)
      : this.goalsService.createGoal(payload);
    req.subscribe({
      next: () => {
        this.closeModal();
        this.loadGoals();
      },
      error: (err) => {
        this.modalError.set(err.error?.message ?? 'Request failed');
      }
    });
  }

  onDelete(id: number): void {
    this.goalsService.deleteGoal(id).subscribe({
      next: () => {
        this.closeModal();
        this.loadGoals();
      },
      error: (err) => this.error.set(err.error?.message ?? 'Delete failed')
    });
  }



}