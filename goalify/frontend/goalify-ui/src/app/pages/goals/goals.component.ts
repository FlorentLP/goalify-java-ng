import { Component, OnInit, inject, signal } from '@angular/core';
import { GoalsService } from '../../goals/goals.service';
import type { GoalResponse, GoalStatus, CreateGoalRequest } from '../../goals/goals.model';
import { GoalFormModalComponent } from './goal-form-modal/goal-form-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoalOngoingView } from './goal-ongoing-view/goal-ongoing-view';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [GoalFormModalComponent, GoalOngoingView],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit {
  private goalsService = inject(GoalsService);
  private sanitizer = inject(DomSanitizer);

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