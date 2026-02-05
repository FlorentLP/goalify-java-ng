import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginRequest } from '../../auth/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.form.invalid) return;
    const body: LoginRequest = this.form.getRawValue();
    this.auth.login(body).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this.errorMessage = err.error?.message || err.error?.error ||'Login failed. Check your email and password.';
        this.cdr.detectChanges();
      }
    });
  }
}