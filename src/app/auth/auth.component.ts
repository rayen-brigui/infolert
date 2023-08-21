import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  loginEmail: string = '';
  loginPassword: string = '';

  // Sign-up form variables
  signupEmail: string = '';
  signupPassword: string = '';

  // Show/hide sign-up form
  showSignUpForm: boolean = false;


  // Login method
  login() {
    // Implement your login logic here
    // You can use this.loginEmail and this.loginPassword to access the user's input
  }

  // Sign-up method
  signup() {
    // Implement your sign-up logic here
    // You can use this.signupEmail and this.signupPassword to access the user's input
  }

  // Toggle between login and sign-up forms
  toggleForms() {
    this.showSignUpForm = !this.showSignUpForm;
    // Clear form fields when toggling
    this.loginEmail = '';
    this.loginPassword = '';
    this.signupEmail = '';
    this.signupPassword = '';
  }
}
