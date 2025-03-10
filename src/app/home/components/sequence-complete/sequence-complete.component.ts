import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sequence-complete',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sequence-complete.component.html',
  styleUrl: './sequence-complete.component.scss',
})
export class SequenceCompleteComponent {
  public authService = inject(AuthService);
  private settingsService = inject(SettingsServiceService);
  public flowSequenceService = inject(FlowSequenceServiceService);
  public fadeIn: boolean | null = null;

  ngAfterViewInit() {
    setTimeout(() => {
      this.fadeIn = true;
    });
  }

  openSettings() {
    this.settingsService.activeTab = 'timers';
    this.settingsService.settingsOpen = true;
  }
}
