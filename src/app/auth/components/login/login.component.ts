import { Component, Inject, inject } from '@angular/core';
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

  async loginWithGoogle() {
    console.log('google Login');
    await this.authService.loginWithGoogle();
    this.router.navigateByUrl('/home');
  }

  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/home');
  }
}
