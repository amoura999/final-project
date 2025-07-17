import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      role: ['user', [Validators.required]],
    });
  }

  onSubmit() {
    this.error = null;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.auth.signup(this.signupForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        // TODO: Redirect to verify email or login
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Signup failed';
      }
    });
  }
}
