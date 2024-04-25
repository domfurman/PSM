import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../interfaces/credentials';
import { SignUpCredentials } from '../../interfaces/sign-up-credentials';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  credentials: Credentials = {
    email: '',
    password: ''
  };

  signUpCredentials: SignUpCredentials = {
    name: '',
    surname: '',
    age: 0,
    email: '',
    password: ''
  }

  showLoginForm = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials.email, this.credentials.password);
  }

  signup() {
    this.authService.signUp(this.signUpCredentials.email, this.signUpCredentials.password, this.signUpCredentials.name, this.signUpCredentials.surname, this.signUpCredentials.age);
  }

  changeForm() {
    this.showLoginForm = !this.showLoginForm
  }

  googleLogin(){
    this.authService.signInWithGoogle()
      .then((result) => {
        console.log('Google login successful:', result);
    })
      .catch((error) => {
        console.error('Google login failed:', error);
    });
  }
  
  
}
