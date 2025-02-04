import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsBaseComponent } from '../settings-base/settings-base.component';

@Component({
  selector: 'app-settings-overlay',
  standalone: true,
  imports: [CommonModule, SettingsBaseComponent],
  templateUrl: './settings-overlay.component.html',
  styleUrl: './settings-overlay.component.scss',
})
export class SettingsOverlayComponent {
  private settingsService = inject(SettingsServiceService);

  public start: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.start = true;
    }, 1);
  }

  closeOverlay() {
    this.start = false;
    setTimeout(() => {
      this.settingsService.settingsOpen = false;
    }, 750);
  }
}
