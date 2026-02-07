import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHabitRequest, HabitResponse } from '../../../habits/habits.model';
import { GoalResponse } from '../../../goals/goals.model';

@Component({
  selector: 'app-habit-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './habit-form-modal.component.html',
  standalone: true,
  styles: []
})
export class HabitFormModalComponent implements OnChanges {

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() habit: HabitResponse | null = null;
  @Input() goals: GoalResponse[] = [];


  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<CreateHabitRequest | HabitResponse>();
  @Output() delete = new EventEmitter<number>();


  form: FormGroup;
  submitting = false;
  error: string | null = null;
  confirmingDelete = false;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      goalId: [this.goals.length > 0 ? this.goals[0].id : null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      effortPoint: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      hasData: [false, [Validators.required]],
      scheduledTime: ['09:00', [Validators.required]],
      emoji: [null as string | null],
      recurrenceMonday: [true, [Validators.required]],
      recurrenceTuesday: [true, [Validators.required]],
      recurrenceWednesday: [true, [Validators.required]],
      recurrenceThursday: [true, [Validators.required]],
      recurrenceFriday: [true, [Validators.required]],
      recurrenceSaturday: [true, [Validators.required]],
      recurrenceSunday: [true, [Validators.required]],
    });
  }

  ngOnChanges(): void {
    if (this.habit) {
      this.form.patchValue({
        goalId: this.habit.goalId,
        name: this.habit.name,
        effortPoint: this.habit.effortPoint,
        hasData: this.habit.hasData,
        scheduledTime: this.habit.scheduledTime,
        emoji: this.habit.emoji,
        recurrenceMonday: this.habit.recurrenceMonday,
        recurrenceTuesday: this.habit.recurrenceTuesday,
        recurrenceWednesday: this.habit.recurrenceWednesday,
        recurrenceThursday: this.habit.recurrenceThursday,
        recurrenceFriday: this.habit.recurrenceFriday,
        recurrenceSaturday: this.habit.recurrenceSaturday,
        recurrenceSunday: this.habit.recurrenceSunday,
      });
    } else {
      const firstGoalId = this.goals.length > 0 ? this.goals[0].id : null;
      this.form.reset({
        name: '',
        goalId: firstGoalId,
        effortPoint: 1,
        hasData: false,
        scheduledTime: '09:00',
        emoji: null,
        recurrenceMonday: true,
        recurrenceTuesday: true,
        recurrenceWednesday: true,
        recurrenceThursday: true,
        recurrenceFriday: true,
        recurrenceSaturday: true,
        recurrenceSunday: true,
      });
    }
    this.error = null;
  }

  

  get title(): string {
    return this.mode === 'create' ? 'New Habit' : 'Edit Habit';
  }

  get submitLabel(): string {
    return this.mode === 'create' ? 'Create' : 'Save';
  }
  

  onBackdropClick(): void {
    this.close.emit();
  }

  onFormSubmit(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;
    this.error = null;
    const value = this.form.value as CreateHabitRequest;
    this.saved.emit(value);
    this.submitting = false;
  }

  onDeleteClick(): void {
    if (this.mode !== 'edit' || !this.habit) return;
    this.confirmingDelete = true;
  }
  
  onConfirmDelete(): void {
    if (!this.habit) return;
    this.delete.emit(this.habit.id);
    this.confirmingDelete = false;
  }
  
  onCancelDelete(): void {
    this.confirmingDelete = false;
  }
}
