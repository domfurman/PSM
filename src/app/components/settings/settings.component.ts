import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  credentials: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getCurUser();
    this.getCurrentUserEmail();
  }

  getCurUser() {
    this.authService.matchUser().subscribe((credentials) => {
      console.log(credentials)
    });
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

  //   toggleVibration(event: Event) {
  //     if (event.target instanceof HTMLInputElement) {
  //       const checkbox = event.target as HTMLInputElement;
  //       this.vibrationEnabled = checkbox.checked;
  //       if (this.vibrationEnabled) {
  //         window.navigator.vibrate(200);
  //       } else {
  //         window.navigator.vibrate(0);
  //       }
  //     }
  //  }

  //  Vibration() {
  //     if (this.vibrationEnabled) {
  //       window.navigator.vibrate(200);
  //     }
  //  }

  // toggleVibration(enable:boolean) {
  //   if (enable){
  //     window.navigator.vibrate(200);
  //   } else {
  //     window.navigator.vibrate(0);
  //   }
  // }
}
