import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}