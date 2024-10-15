import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-settings-sound',
  standalone: true,
  imports: [],
  templateUrl: './settings-sound.component.html',
  styleUrl: './settings-sound.component.scss',
})
export class SettingsSoundComponent {
  public settingsService = inject(SettingsServiceService);
}
