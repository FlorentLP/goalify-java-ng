import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styles: [`
    :host {
      display: flex;
      flex: 1;
      min-height: 0;
    }
  `]})
export class SidebarComponent {
  constructor(public auth: AuthService) {}
}