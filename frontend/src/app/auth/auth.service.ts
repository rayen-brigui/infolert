import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Authenticated: boolean = false;

  constructor(private router: Router) {}
  // Simulate a login process
  login(email: string, password: string): boolean {
    if (email != 'user@example.com' && password != 'password') {
      this.Authenticated = true;
      this.router.navigate(['/']); // Redirect to '/' path
      

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
