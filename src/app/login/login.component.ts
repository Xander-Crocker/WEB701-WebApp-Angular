import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <section class="listing-apply">
        <h2 class="section-heading">Login to your account</h2>
        <form [formGroup]="loginForm" (submit)="submitApplication()">
          <label id="username">Username</label>
          <input id="username" type="username" formControlName="username">
          <label id="password">Password</label>
          <input id="password" type="password" formControlName="password">
          <button type="submit" class="primary">Login</button>
        </form>
        <div *ngIf="loginSuccess" class="success-message">Successfully logged in!</div>
        <div *ngIf="loginError" class="error-message">{{ loginError }}</div>
      </section>
    </article>
  `,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginSuccess: boolean = false;
  loginError: string | null = null;
  
  // Not navigating to home component yet
  constructor(private router: Router) {}

  submitApplication() {
    const loginData = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    };

    fetch('http://localhost:5050/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Handle successful login
        this.loginSuccess = true;
        this.loginError = null;
        console.log('Login successful:', data);

        if (data.message) {
          // Handle specific success message from backend
          console.log('Success message:', data.message);
          // Navigate to home component (Not navigating yet)
          this.router.navigate(['/']);
        }
      } else {
        // Handle login failure ONLY when data.success is false
        this.loginSuccess = false;
        this.loginError = data.message;
      }
    })
    .catch(error => {
      this.loginSuccess = false;
      this.loginError = 'An error occurred. Please try again.';
      console.error('Error:', error);
    });
  }
}
