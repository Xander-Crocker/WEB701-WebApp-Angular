import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

const API_URL = "http://localhost:8081/api/auth/";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <section class="listing-apply">
        <h2 class="section-heading">Register your account</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label id="username">Username</label>
          <input id="username" type="username" formControlName="username">

          <label id="email">Email</label>
          <input id="email" type="email" formControlName="email">

          <label id="password">Password</label>
          <input id="password" type="password" formControlName="password">

          <br>
          <button type="submit" class="primary">Register</button>
        </form>
        <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
        <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
      </section>
    </article>
  `,
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  // Define the registration form with username, email, password, and isAdmin fields
  applyForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false),
  });

  // Variables to store the success and error messages
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Inject the Router service for navigation
  constructor(private router: Router) {}

  // Method to handle form submission
  submitApplication() {
     // Extract form data
    const formData = this.applyForm.value;

    // Send a POST request to the registration API
    axios.post(API_URL + 'signup', formData)
      // Handle successful registration
      .then(response => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = null;
        console.log('User registered', response.data);
        // Navigate to the login page
        this.router.navigate(['/login']);
      })
      .catch(error => {
        // Handle errors and display an error message
        this.errorMessage = error.response?.data?.message || 'Registration error';
        this.successMessage = null;
        console.error('Error:', error);
      });
  }
}