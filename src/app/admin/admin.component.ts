import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h3>Admin Page - User Records</h3>
      <p>Content that only a user with admin permissions can access</p>
      <form class="formList">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUserList">
              <td>{{ user.username }}</td>
              <td>{{ user.password }}</td>
              <td>{{ user.roles }}</td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  `,
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  // List of all users
  userList: User[] = [];
  // List of users to be displayed, can be filtered
  filteredUserList: User[] = [];

  // Lifecycle hook that is called after data-bound properties are initialized
  ngOnInit() {
    this.fetchUsers();
  }

  // Method to fetch users from the server
  async fetchUsers() {
    try {
      const response = await fetch('http://localhost:5050/api/user/all/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userList: User[] = await response.json();
      this.userList = userList;
      this.filteredUserList = userList;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
}