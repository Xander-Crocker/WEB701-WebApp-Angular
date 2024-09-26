import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <form>
        <h3>Home Content</h3>
        <p>Content that a user without admin permissions can access</p>
      </form>
    </section>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ngOnInit() {
    console.log('Home Component initialized');
  }
}
