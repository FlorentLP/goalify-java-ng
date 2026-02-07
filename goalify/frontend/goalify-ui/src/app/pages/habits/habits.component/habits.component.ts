import { Component, inject, OnInit, signal } from '@angular/core';
import { FilterPillsComponent } from '../../../core/filter-pills.component/filter-pills.component';
import { HabitsFilterStatus } from '../../../core/filter-pills.component/filter-pills.component';
import { HabitResponse } from '../../../habits/habits.model';
import { HabitsService } from '../../../habits/habits.service';
import { HabitsManageViewComponent } from '../habits-manage-view.component/habits-manage-view.component';
import { HabitsMydayViewComponent } from '../habits-myday-view.component/habits-myday-view.component';
import { HabitsMyweekViewComponent } from '../habits-myweek-view.component/habits-myweek-view.component';

@Component({
  selector: 'app-habits',
  imports: [FilterPillsComponent, HabitsManageViewComponent, HabitsMydayViewComponent, HabitsMyweekViewComponent],
  standalone:true,
  templateUrl: './habits.component.html',
  styles: []
})
export class HabitsComponent implements OnInit {
  private habitsService = inject(HabitsService);

  filterStatus = signal<HabitsFilterStatus>('MYDAY');
  habits = signal<HabitResponse[]>([])
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(){
    this.loadHabits();
  }

  loadHabits(){
    this.loading.set(true);
    this.error.set(null);
    this.habitsService.getHabits().subscribe({
      next: (list) => {
        const sorted = [...list].sort((a, b) => {
          const byTime = (a.scheduledTime ?? '').localeCompare(b.scheduledTime ?? '');
          if (byTime !== 0) return byTime;
          return a.name.localeCompare(b.name);
        });
        this.habits.set(sorted);
        this.loading.set(false);
      },
      error: (err) =>{
        this.error.set(err.error?.message ?? 'Error while loading the habits');
        this.loading.set(false);
      }
    });
  }

  setFilter(status: string): void {
    this.filterStatus.set(status as HabitsFilterStatus);
  }
}
