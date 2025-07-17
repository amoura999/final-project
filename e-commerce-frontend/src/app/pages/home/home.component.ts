import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [RouterModule],
})
export class HomeComponent {
  constructor(public router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
} 