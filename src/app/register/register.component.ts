import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, RouterModule],
  template: `
    <article>
      <section class="listing-apply">
        <h2 class="section-heading">Register your account</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label id="username">Username</label>
          <input id="username" type="username" formControlName="username">

          <label id="password">Password</label>
          <input id="password" type="password" formControlName="password">

          <label id="admin" class="checkbox">Admin</label><mat-checkbox formControlName="isAdmin"></mat-checkbox>
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
  applyForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false),
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  submitApplication() {
    const formData = this.applyForm.value;
    fetch('http://localhost:5050/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      this.successMessage = 'User registered successfully';
      this.errorMessage = null;
      console.log('User registered', data);
      this.router.navigate(['/login']);
        })
        .catch(error => {
      this.errorMessage = 'Registration error';
      this.successMessage = null;
      console.error('Error:', error);
    });
  }

}