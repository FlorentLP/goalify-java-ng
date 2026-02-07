import { Component, input } from '@angular/core';
import { HabitResponse } from '../../../habits/habits.model';

@Component({
  selector: 'app-habits-manage-view',
  imports: [],
  standalone:true,
  templateUrl: './habits-manage-view.component.html',
  styles: []
})
export class HabitsManageViewComponent {
  habits = input.required<HabitResponse[]>();

}
