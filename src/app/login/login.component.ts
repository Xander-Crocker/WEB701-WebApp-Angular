import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>

      <section class="listing-apply">
        <h2 class="section-heading">Register your account</h2>
        <form [formGroup]="loginForm" (submit)="submitApplication()">

          <label id="username">Username</label>
          <input id="username" type="username" formControlName="username">

          <label id="password">Password</label>
          <input id="password" type="password" formControlName="password">

          <button type="submit" class="primary">Login</button>
        </form>
      </section>

    </article>
  `,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userList: User[] = [];
  userService: UserService = inject(UserService);
  filteredUserList: User[] = [];

  constructor() {
    this.userService.getAllUsers().then((userList: User[]) => {
      this.userList = userList;
      this.filteredUserList = userList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredUserList = this.userList;

    this.filteredUserList = this.userList.filter(
      user => user?.username.toLowerCase().includes(text.toLowerCase())
    );
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitApplication() {
    this.userService.submitApplication(
      this.loginForm.value.username ?? '',
      this.loginForm.value.password ?? '',
    );
  }

}
