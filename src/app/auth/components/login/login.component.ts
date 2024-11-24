import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);

  loginWithGoogle() {
    console.log('google Login');
    this.router.navigateByUrl('/home');
  }

  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/home');
  }
}