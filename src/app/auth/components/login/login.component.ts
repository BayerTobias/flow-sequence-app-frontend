import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  async loginWithGoogle() {
    console.log('google Login');
    await this.authService.loginWithGoogle();
    this.router.navigateByUrl('/welcome');
  }

  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
