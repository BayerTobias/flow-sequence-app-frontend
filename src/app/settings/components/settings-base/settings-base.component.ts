import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { SettingsGeneralComponent } from '../settings-general/settings-general.component';
import { SettingsCustomTimersComponent } from '../settings-custom-timers/settings-custom-timers.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-settings-base',
  standalone: true,
  imports: [
    CommonModule,
    SettingsGeneralComponent,
    SettingsCustomTimersComponent,
  ],
  templateUrl: './settings-base.component.html',
  styleUrl: './settings-base.component.scss',
})
export class SettingsBaseComponent {
  @Input() startAnimation: boolean = false;
  public settingsService = inject(SettingsServiceService);
}
