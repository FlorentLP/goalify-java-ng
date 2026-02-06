import { Component, signal } from '@angular/core';
import { FilterPillsComponent } from '../../../core/filter-pills.component/filter-pills.component';
import { HabitsFilterStatus } from '../../../core/filter-pills.component/filter-pills.component';

@Component({
  selector: 'app-habits',
  imports: [FilterPillsComponent],
  standalone:true,
  templateUrl: './habits.component.html',
  styles: []
})
export class HabitsComponent {

  filterStatus = signal<HabitsFilterStatus>('MYDAY');


  setFilter(status: string): void {
    this.filterStatus.set(status as HabitsFilterStatus);
  }
}
