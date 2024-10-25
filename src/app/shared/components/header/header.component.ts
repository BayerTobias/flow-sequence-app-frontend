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
    console.log(this.settingsService.settingsOpen);

    this.settingsService.settingsOpen = true;
    console.log(this.settingsService.settingsOpen);
  }
}
