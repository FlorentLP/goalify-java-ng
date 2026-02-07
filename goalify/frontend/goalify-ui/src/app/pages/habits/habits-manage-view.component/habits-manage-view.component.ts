import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { CreateHabitRequest, HabitResponse } from '../../../habits/habits.model';
import { AddFabComponent } from '../../../core/add-fab.component/add-fab.component';
import { GoalResponse } from '../../../goals/goals.model';
import { GoalsService } from '../../../goals/goals.service';
import { HabitsService } from '../../../habits/habits.service';
import { HabitFormModalComponent } from '../habit-form-modal.component/habit-form-modal.component';

@Component({
  selector: 'app-habits-manage-view',
  imports: [AddFabComponent, HabitFormModalComponent],
  standalone:true,
  templateUrl: './habits-manage-view.component.html',
  styles: []
})
export class HabitsManageViewComponent implements OnInit{
  private goalsService = inject(GoalsService);
  private habitsService = inject(HabitsService);

  habits = input.required<HabitResponse[]>();
  habitsError = input.required<string | null>();
  loadHabits = output<void>();


  goals = signal<GoalResponse[]>([]);
  goalsloading = signal<boolean>(false);
  goalserror = signal<string|null>(null);

  
  modalOpen = signal<'create' | 'edit' | null>(null);
  habitToEdit = signal<HabitResponse | null>(null);
  modalError = signal<string | null>(null);
  
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

  openCreateModal(){
    this.habitToEdit.set(null);
    this.modalError.set(null);
    this.modalOpen.set('create');;
  }

  openEditModal(habit: HabitResponse): void {
    this.habitToEdit.set(habit);
    this.modalError.set(null);
    this.modalOpen.set('edit');
  }

  closeModal(): void {
    this.modalOpen.set(null);
    this.habitToEdit.set(null);
    this.modalError.set(null);
  }

  onModalSaved(payload: CreateHabitRequest): void {
    const id = this.habitToEdit()?.id;
    const req = id
      ? this.habitsService.updateHabit(id, payload)
      : this.habitsService.createHabit(payload);
    req.subscribe({
      next: () => {
        this.closeModal();
        this.loadHabits.emit();
      },
      error: (err) => {
        this.modalError.set(err.error?.message ?? 'Request failed');
      }
    });
  }

  onDelete(id: number): void {
    this.habitsService.deleteHabit(id).subscribe({
      next: () => {
        this.closeModal();
        this.loadHabits.emit();
      },
      error: (err) => this.modalError.set(err.error?.message ?? 'Delete failed')    });
  }
}
