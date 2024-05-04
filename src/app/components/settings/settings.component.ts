import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  credentials: string = '';
  email: string = '';
  userSubscription!: Subscription;
  mail: string = '';
  gmailuser: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  async ngOnInit(): Promise<void> {
    await this.userAuthCheck()
    this.matchUser()
    this.getCurrentUserEmail()
  }

  async userAuthCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userSubscription = this.authService.user$.subscribe((user: { email: string; }) => {
        if (user) {
          this.mail = user.email;
        } else {
          this.mail = '';
        }
        resolve(); // Resolve the Promise when userAuthCheck is completed
      });
    });
  }

  matchUser() {
    this.authService.matchUserWithEmail(this.mail).subscribe(credentials => {
      if (credentials) {
        this.credentials = credentials;
      } else {
        this.gmailuser = true;
      }
      
  })
  }

  getCurrentUserEmail() {
    const email = this.authService.getCurrentUserEmail();
    if (typeof email === 'string') {
      this.email = email.toString();
    } else {
      this.email = 'ERROR: Email not found'
    }
  }

  logoutAlert() {
    Swal.fire({
      title: 'Logout succesfull',
      text: 'You will be redirected to login page.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
        this.redirectToLogin();
      }
    });
  }

  logOut() {
    this.authService.logout();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
