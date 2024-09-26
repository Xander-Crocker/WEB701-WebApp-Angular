import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
      <main>
        <header>
          <a routerLink="/"><button class="btn btn-success pull-right">Home</button></a>
          <a routerLink="/register"><button class="navBtn">Register</button></a>  
          <a routerLink="/login"><button class="navBtn">Login</button></a>
        </header>
        <section class="content">
          <router-outlet></router-outlet> 
        </section>
      </main>
  `,
  styleUrls: ['./navbar.component.css'],
  imports: [HomeComponent, RouterModule]
})
export class NavbarComponent {
  title = 'navbar';

}