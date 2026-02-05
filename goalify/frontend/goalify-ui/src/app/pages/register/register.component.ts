import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RegisterRequest } from '../../auth/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.form.invalid) return;
    const body: RegisterRequest = this.form.getRawValue();
    this.auth.register(body).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this.errorMessage = err.error?.message || err.error?.error ||'Registration failed. Email may already be in use.';
        this.cdr.detectChanges();
    }
    });
  }
}