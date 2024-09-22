import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-settings-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-overlay.component.html',
  styleUrl: './settings-overlay.component.scss',
})
export class SettingsOverlayComponent {
  private settingsService = inject(SettingsServiceService);

  start: boolean = false;

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
