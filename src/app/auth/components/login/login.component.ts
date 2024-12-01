import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  loginWithGoogle() {
    console.log('google Login');
    this.authService.login();
  }

  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/home');
  }
}
