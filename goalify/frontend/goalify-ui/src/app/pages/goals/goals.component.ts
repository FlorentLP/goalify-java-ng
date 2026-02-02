import { Component, OnInit, inject, signal } from '@angular/core';
import { GoalsService } from '../../goals/goals.service';
import type { GoalResponse, GoalStatus, CreateGoalRequest } from '../../goals/goals.model';
import { GoalFormModalComponent } from './goal-form-modal/goal-form-modal.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [GoalFormModalComponent],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
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
        this.goals.set(list);
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

  getGoalImageUrl(goal: GoalResponse): string {
    // Placeholder until you add image URL to the backend
    const base = 'https://placehold.co/400x240';
    const colors: Record<string, string> = {
      HEALTH: '22c55e/white',
      SOCIAL: '3b82f6/white',
      INTELLECT: '8b5cf6/white',
      AESTHETIC: 'ec4899/white',
      MINDSET: 'f59e0b/white',
      OTHER: '6366f1/white'
    };
    const color = colors[goal.goalCategory] ?? '6366f1/white';
    return `${base}/${color}?text=${encodeURIComponent(goal.name)}`;
  }

  /** Couleur du rond de priorité : 5 = haute (rouge) → 1 = basse (gris). */
  getPriorityColorClass(priority: number): string {
    const classes: Record<number, string> = {
      1: 'bg-gray-400',
      2: 'bg-indigo-500',
      3: 'bg-amber-500',
      4: 'bg-orange-500',
      5: 'bg-red-500'
    };
    return classes[priority] ?? 'bg-gray-400';
  }
}