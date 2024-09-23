import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <article>

      <section class="listing-apply">
        <h2 class="section-heading">Register your account</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">

          <label id="username">Username</label>
          <input id="username" type="username" formControlName="username">

          <label id="password">Password</label>
          <input id="password" type="password" formControlName="password">

          <label id="admin">Admin</label><mat-checkbox></mat-checkbox>
          <br>
          <button type="submit" class="primary">Register</button>
        </form>
      </section>

    </article>
  `,
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: User | undefined;
  
  applyForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    admin: new FormControl(false)
  });

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.userService.getUserById(userId).then((user) => {
      this.user = user;
    });
  }

  submitApplication() {
    this.userService.submitApplication(
      this.applyForm.value.username ?? '',
      this.applyForm.value.password ?? ''
    );
  }

}
