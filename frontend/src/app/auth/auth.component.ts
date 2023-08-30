import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AuthComponent implements OnInit {
  constructor(private navCtrl: NavController) {}
  ngOnInit() {}
  loginEmail: string = '';
  loginPassword: string = '';

  // Sign-up form variables
  signupFname: string = '';
  signupLname: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  signupConfirmPassword: string = '';

  // Show/hide sign-up form
  showSignUpForm: boolean = false;
  route = new Router();
  // Login method
 login() {
    if (this.loginEmail !== '' || this.loginPassword !== '') {
    let  auth = new AuthService(this.route);
  let res=   auth.login(this.loginEmail, this.loginPassword)
      
    console.log('==============1==================');
    console.log(res);
    console.log('====================================');
      


    }
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
