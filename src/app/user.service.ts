import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Base URL for the API
  url = 'http://localhost:8081/api/auth/';

  constructor() { }

  // Method to fetch all users from the server
  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  // Method to fetch a user by their ID
  async getUserById(id: number): Promise<User | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  // Method to handle form submission (currently logs the username and password)
  submitApplication(username: string, password: string) {
    console.log(username, password);
  }
}

