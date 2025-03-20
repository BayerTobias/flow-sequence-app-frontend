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
    effect(() => {
      if (this.appNavService.scrollToLogin()) {
        this.loginSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  async loginWithGoogle() {
    console.log('google Login');
    await this.authService.loginWithGoogle();
    this.router.navigateByUrl('/welcome');
  }

  redirectToHomeWithoutLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
