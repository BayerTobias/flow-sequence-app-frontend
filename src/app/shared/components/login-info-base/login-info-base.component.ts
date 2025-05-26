import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsServiceService } from '../../services/settings-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login-info-base',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './login-info-base.component.html',
  styleUrl: './login-info-base.component.scss',
})
export class LoginInfoBaseComponent {
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public loginPage: boolean = true;

  /**
   * Subscribes to router navigation events to determine
   * if the current route is the login page and updates `loginPage` flag accordingly.
   */
  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url;

        if (path === '/login') {
          this.loginPage = true;
        } else {
          this.loginPage = false;
        }
      });
  }
}
