import { Component, inject } from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [SimpleSettingsButtonComponent],
  templateUrl: './settings-general.component.html',
  styleUrl: './settings-general.component.scss',
})
export class SettingsGeneralComponent {
  public authService = inject(AuthService);
  public settingsService = inject(SettingsServiceService);

  async logoutAndCloseSettings() {
    this.settingsService.settingsOpen = false;
    await this.authService.logout();
  }
}
