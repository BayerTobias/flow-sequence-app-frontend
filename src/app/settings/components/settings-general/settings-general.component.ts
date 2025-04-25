import { Component, HostListener, inject } from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsButtonWithIconComponent } from '../../../shared/components/buttons/settings-button-with-icon/settings-button-with-icon.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [
    SimpleSettingsButtonComponent,
    SettingsButtonWithIconComponent,
    CommonModule,
  ],
  templateUrl: './settings-general.component.html',
  styleUrl: './settings-general.component.scss',
})
export class SettingsGeneralComponent {
  public authService = inject(AuthService);
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public startAnimation: boolean = false;
  public isMobile = window.innerWidth < 900;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 900;
  }

  async logoutAndCloseSettings() {
    this.settingsService.settingsOpen = false;
    await this.authService.logout();
  }

  navigateLogin() {
    this.settingsService.settingsOpen = false;
    this.router.navigateByUrl('/login');
  }

  openConfirmDelete() {
    this.settingsService.confirmDeleteAccountOpen = true;
  }
}
