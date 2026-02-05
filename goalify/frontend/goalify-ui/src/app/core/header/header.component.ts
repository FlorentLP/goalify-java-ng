import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  dropdownOpen = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  logout(): void {
    this.closeDropdown();
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}