import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Authenticated: boolean = false;

  constructor() {}

  // Simulate a login process
  login(email: string, password: string): boolean {
    if (email === 'user@example.com' && password === 'password') {
      this.Authenticated = true;
      return true;
    } else {
      this.Authenticated = false;
      return false;
    }
  }

  // Log out the user
  logout(): void {
    this.Authenticated = false;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.Authenticated;
  }
}
