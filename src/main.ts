import { bootstrapApplication } from '@angular/platform-browser';
import { NavbarComponent } from './app/navbar/navbar.component';
import { provideRouter } from '@angular/router'; 
import routeConfig from './app/routes';

bootstrapApplication(NavbarComponent, { 
  providers: [
    provideRouter(routeConfig)
  ]
}).catch(err => console.error(err));
