import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logoutAlert() {
    Swal.fire({
      title: 'Logout succesfull',
      text: "You will be redirected to login page.",
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut()
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

  toggleVibration(enable:boolean) {
    if (enable){
      window.navigator.vibrate(200);
    } else {
      window.navigator.vibrate(0);
    }
  }
    
}
