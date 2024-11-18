import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

// Define the route configuration for the application
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page' 
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Registration Page' 
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page' 
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin Page' 
    }
];

// Export the route configuration
export default routeConfig;

