import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = "http://localhost:8081/api/auth/";

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
  // Define the login form with username and password fields
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  // Variables to store the login success status and error message
  loginSuccess: boolean = false;
  loginError: string | null = null;

  // Inject the Router service for navigation
  constructor(private router: Router) {}

  // Method to handle form submission
  submitApplication() {
    // Extract form data
    const loginData = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    };

    // Send a POST request to the login API
    axios.post(API_URL + 'signin', loginData)
      .then(response => {
        console.log('Login response:', response.data);

        // If a token is received, decode it and store the user information in localStorage
        if (response.data.token) {
          console.log('Token:', response.data.token);
          const decodedToken = jwtDecode(response.data.token);
          console.log('Decoded token:', decodedToken);
          localStorage.setItem('user', JSON.stringify(decodedToken));
          console.log('User stored in localStorage:', localStorage.getItem('user'));
          this.loginSuccess = true;
          this.loginError = null;
          // Navigate to home or another component if needed
          // this.router.navigate(['/home']);
        }
      })
      .catch(error => {
        // Handle errors and display an error message
        this.loginSuccess = false;
        this.loginError = error.response?.data?.message || 'Login failed';
        console.error('There was an error!', error);
      });
  }
}