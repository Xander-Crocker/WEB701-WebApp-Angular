import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:5050/api/user/all';

  constructor() { }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getUserById(id: number): Promise<User | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(username: string, password: string) {
    console.log(username, password);
  }

}
