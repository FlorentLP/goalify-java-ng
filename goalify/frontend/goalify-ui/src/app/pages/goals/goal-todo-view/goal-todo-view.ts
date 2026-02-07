import { Component, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CreateGoalRequest, GoalResponse } from '../../../goals/goals.model';
import { AddFabComponent } from '../../../core/add-fab.component/add-fab.component';
import { GoalsService } from '../../../goals/goals.service';
import { GoalFormModalComponent } from '../goal-form-modal/goal-form-modal.component';

@Component({
  selector: 'app-goal-todo-view',
  imports: [AddFabComponent, GoalFormModalComponent],
  templateUrl: './goal-todo-view.html',
  styles: []
})
export class GoalTodoView {
  private sanitizer = inject(DomSanitizer);
  private goalsService = inject(GoalsService)

  goals = input.required<GoalResponse[]>();
  error = input.required<string | null>();
  
  loadGoals = output<void>();

  modalOpen = signal<'create' | 'edit' | null>(null);
  goalToEdit = signal<GoalResponse | null>(null);
  modalError = signal<string | null>(null);

  openCreateModal(){
    this.goalToEdit.set(null);
    this.modalError.set(null);
    this.modalOpen.set('create');;
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
        this.loadGoals.emit();
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
        this.loadGoals.emit();
      },
      error: (err) => this.modalError.set(err.error?.message ?? 'Delete failed')    });
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
