import { Component, input } from '@angular/core';
import { HabitResponse } from '../../../habits/habits.model';

@Component({
  selector: 'app-habits-myday-view',
  imports: [],
  standalone:true,
  templateUrl: './habits-myday-view.component.html',
  styles: []
})
export class HabitsMydayViewComponent {
  habits = input.required<HabitResponse[]>();

}
