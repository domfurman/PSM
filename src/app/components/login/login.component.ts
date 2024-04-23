import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../interfaces/credentials';


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

  showLoginForm = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials.email, this.credentials.password);
  }

  signup() {
    this.authService.signUp(this.credentials.email, this.credentials.password);
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
