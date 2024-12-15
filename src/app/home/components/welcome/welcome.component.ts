import { Component, effect, inject } from '@angular/core';
import { GlassButtonComponent } from '../../../shared/components/buttons/glass-button/glass-button.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [GlassButtonComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private flowSequenceService = inject(FlowSequenceServiceService);
  private settingsService = inject(SettingsServiceService);
  public authService = inject(AuthService);
  public displayName: string | null = null;

  constructor() {
    effect(() => {
      const fullName = this.authService.userSignal()?.displayName;

      if (fullName) {
        const firstName = fullName.split(' ')[0];
        this.displayName = ' ' + firstName;
      } else {
        this.displayName = '';
      }
    });
  }

  startStandardSequence() {
    const standardSequence = this.settingsService.standardSequence;
    const step1 = standardSequence.steps[0];
    this.flowSequenceService.activeFlowSequence = standardSequence;
    this.flowSequenceService.minutesRemaining = step1.duration;
    this.flowSequenceService.secondsOfMinuteRemainung = 60;
  }

  startReverseSequence() {
    const reverseSequence = this.settingsService.reverseSequence;
    const step1 = reverseSequence.steps[0];
    this.flowSequenceService.activeFlowSequence = reverseSequence;
    this.flowSequenceService.minutesRemaining = step1.duration;
    this.flowSequenceService.secondsOfMinuteRemainung = 60;
  }

  openCreateTimerMenu() {
    this.settingsService.activeTab = 'timers';
    this.settingsService.settingsOpen = true;
  }

  openSavedTimersMenu() {
    this.settingsService.activeTab = 'timers';
    this.settingsService.settingsOpen = true;
  }
}
