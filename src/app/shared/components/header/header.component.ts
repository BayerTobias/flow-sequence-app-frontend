import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../services/settings-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public settingsService = inject(SettingsServiceService);

  openSettings() {
    this.settingsService.settingsOpen = true;
  }

  openUserMenue() {
    console.log('Open user Menue');
  }
}
