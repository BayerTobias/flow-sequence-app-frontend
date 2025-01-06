import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SettingsGeneralComponent } from '../settings-general/settings-general.component';
import { SettingsCustomTimersComponent } from '../settings-custom-timers/settings-custom-timers.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsThemesComponent } from '../settings-themes/settings-themes.component';
import { SettingsSoundComponent } from '../settings-sound/settings-sound.component';

@Component({
  selector: 'app-settings-base',
  standalone: true,
  imports: [
    CommonModule,
    SettingsGeneralComponent,
    SettingsCustomTimersComponent,
    SettingsThemesComponent,
    SettingsSoundComponent,
  ],
  templateUrl: './settings-base.component.html',
  styleUrl: './settings-base.component.scss',
})
export class SettingsBaseComponent {
  @Input() startAnimation: boolean = false;
  public settingsService = inject(SettingsServiceService);

  @Output() closeOverlayEvent = new EventEmitter();

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }
}
