import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.auth.forgotPassword(this.forgotForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Reset code sent to your email.';
        setTimeout(() => this.router.navigate(['/auth/reset-password']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Request failed';
      }
    });
  }
}
