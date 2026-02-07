import { Component, output } from '@angular/core';

@Component({
  selector: 'app-add-fab',
  imports: [],
  templateUrl: './add-fab.component.html',
  standalone:true,
  styles: []
})
export class AddFabComponent {
  addClick = output<void>();

  onFabClick(): void {
    this.addClick.emit();
  }
}
