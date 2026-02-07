import { Component, input } from '@angular/core';
import { HabitResponse } from '../../../habits/habits.model';

@Component({
  selector: 'app-habits-myweek-view',
  imports: [],
  standalone: true,
  templateUrl: './habits-myweek-view.component.html',
  styles: []
})
export class HabitsMyweekViewComponent {
  habits = input.required<HabitResponse[]>();

}
