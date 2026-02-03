import { Component, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateGoalRequest, GoalResponse, GoalStatus, GoalType, GoalCategory } from '../../../goals/goals.model';

@Component({
  selector: 'app-goal-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './goal-form-modal.component.html',
  styleUrl: './goal-form-modal.component.css'
})
export class GoalFormModalComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() goal: GoalResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<GoalResponse>();
  @Output() delete = new EventEmitter<number>()

  form: FormGroup;
  submitting = false;
  error: string | null = null;
  confirmingDelete = false;
  imageLoading = false;

  readonly statuses: GoalStatus[] = ['TODO', 'ONGOING', 'MAINTENANCE', 'DONE'];
  readonly types: GoalType[] = ['LIFETIME', 'ONETIME'];
  readonly categories: GoalCategory[] = ['HEALTH', 'SOCIAL', 'INTELLECT', 'AESTHETIC', 'MINDSET', 'OTHER'];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      goalStatus: ['TODO', Validators.required],
      goalType: ['LIFETIME', Validators.required],
      goalCategory: ['OTHER', Validators.required],
      priority: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      image: [null as string | null]
      });
  }

  ngOnChanges(): void {
    if (this.goal) {
      this.form.patchValue({
        name: this.goal.name,
        goalStatus: this.goal.goalStatus,
        goalType: this.goal.goalType,
        goalCategory: this.goal.goalCategory,
        priority: this.goal.priority,
        image: this.goal.image
      });
    } else {
      this.form.reset({
        name: '',
        goalStatus: 'TODO',
        goalType: 'LIFETIME',
        goalCategory: 'OTHER',
        priority: 3,
        image: null
      });
    }
    this.error = null;
  }

  get title(): string {
    return this.mode === 'create' ? 'New goal' : 'Edit goal';
  }

  get submitLabel(): string {
    return this.mode === 'create' ? 'Create' : 'Save';
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.form.patchValue({ image: null });
      return;
    }

    this.imageLoading = true;
    this.error = null;
    this.cdr.markForCheck();

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ image: reader.result as string });
      this.imageLoading = false;
      this.cdr.markForCheck();
    };
    reader.onerror = () => {
      this.error = 'Could not read the image';
      this.imageLoading = false;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  onBackdropClick(): void {
    this.close.emit();
  }

  onFormSubmit(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;
    this.error = null;
    const value = this.form.value as CreateGoalRequest;
    this.saved.emit(value as any);
    this.submitting = false;
  }

  onDeleteClick(): void {
    if (this.mode !== 'edit' || !this.goal) return;
    this.confirmingDelete = true;
  }
  
  onConfirmDelete(): void {
    if (!this.goal) return;
    this.delete.emit(this.goal.id);
    this.confirmingDelete = false;
  }
  
  onCancelDelete(): void {
    this.confirmingDelete = false;
  }
}