import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class VerifyEmailComponent {
  verifyForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    // Call backend for email verification
    this.auth.verifyEmail(this.verifyForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Email verified successfully! You can now login.';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Verification failed';
      }
    });
  }
}
