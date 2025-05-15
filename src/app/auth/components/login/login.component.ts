import {
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppNavigationService } from '../../../shared/services/app-navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginSection') loginSection!: ElementRef;

  private router = inject(Router);
  private authService = inject(AuthService);
  private appNavService = inject(AppNavigationService);

  public legalAndLogin: boolean = false;

  constructor() {
    // Reactively scrolls to the login section if the appNavService signals it
    effect(() => {
      if (this.appNavService.scrollToLogin()) {
        this.loginSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /**
   * Handles login via Google.
   * After successful authentication, navigates the user to the welcome page.
   */
  async loginWithGoogle() {
    console.log('google Login');
    await this.authService.loginWithGoogle();
    this.router.navigateByUrl('/welcome');
  }

  /**
   * Redirects the user to the welcome page without performing any login.
   */
  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
