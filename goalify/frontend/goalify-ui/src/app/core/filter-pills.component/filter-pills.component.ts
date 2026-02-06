import { Component, EventEmitter, Input, Output } from '@angular/core';

export type GoalStatus = 'TODO' | 'ONGOING' | 'MAINTENANCE' | 'DONE';
export type HabitsFilterStatus = 'MYDAY' | 'MYWEEK' | 'MANAGE';
export type FilterType = 'habits' | 'goals';

interface FilterOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-filter-pills',
  imports: [],
  standalone: true,
  templateUrl: './filter-pills.component.html',
  styles: [],
})
export class FilterPillsComponent {
  @Input({required:true}) type!: FilterType;
  @Input({required:true}) selectedValue!: String;
  @Output() valueChange = new EventEmitter<string>();


  readonly FILTER_CONFIG: Record<FilterType, FilterOption[]> = {
    habits: [
      { value: 'MYDAY', label: 'My Day' },
      { value: 'MYWEEK', label: 'My Week' },
      { value: 'MANAGE', label: 'Manage' },
    ],
    goals: [
      { value: 'TODO', label: 'To do' },
      { value: 'ONGOING', label: 'Ongoing' },
      { value: 'MAINTENANCE', label: 'Maintenance' },
      { value: 'DONE', label: 'Done' },
    ],
  };

  getOptions(): FilterOption[] {
    return this.FILTER_CONFIG[this.type];
  }

  select(value: string): void {
    this.valueChange.emit(value);
  }
}
