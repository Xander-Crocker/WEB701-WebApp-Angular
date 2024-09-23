import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <form>
        <p>Content</p>
      </form>
    </section>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  userList: User[] = [];
  userService: UserService = inject(UserService);
  filteredUserList: User[] = [];

  constructor() {
    this.userService.getAllUsers().then((userList: User[]) => {
      this.userList = userList;
      this.userList = userList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredUserList = this.userList;

    this.filteredUserList = this.userList.filter(
      user => user?.username.toLowerCase().includes(text.toLowerCase())
    );
  }

}
