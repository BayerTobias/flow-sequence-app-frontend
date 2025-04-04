import { Component, HostListener, inject } from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsButtonWithIconComponent } from '../../../shared/components/buttons/settings-button-with-icon/settings-button-with-icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [SimpleSettingsButtonComponent, SettingsButtonWithIconComponent],
  templateUrl: './settings-general.component.html',
  styleUrl: './settings-general.component.scss',
})
export class SettingsGeneralComponent {
  public authService = inject(AuthService);
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public isMobile = window.innerWidth < 900;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 900;
  }

  async logoutAndCloseSettings() {
    this.settingsService.settingsOpen = false;
    await this.authService.logout();
  }

  async deleteAccount() {
    await this.settingsService.deleteSettings();
    await this.authService.deleteGoogleAccount();
    this.settingsService.settingsOpen = false;
    this.router.navigateByUrl('/login');
  }

  navigateLogin() {
    this.settingsService.settingsOpen = false;
    this.router.navigateByUrl('/login');
  }
}
