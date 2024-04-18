import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: Credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials.email, this.credentials.password);
  }

  signup() {
    this.authService.signUp(this.credentials.email, this.credentials.password);
  }
}
