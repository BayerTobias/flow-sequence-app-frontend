import { Component, effect, inject } from '@angular/core';
import { GlassButtonComponent } from '../../../shared/components/buttons/glass-button/glass-button.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 250,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-welcome',
  standalone: true,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
  imports: [
    HeaderComponent,
    FooterComponent,
    GlassButtonComponent,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  public authService = inject(AuthService);
  private router = inject(Router);
  public displayName: string | null = null;

  constructor() {
    // Clear any active timers when landing on the welcome page
    this.flowSequenceService.clearTimerInterval();

    // Extract and set the user's first name from the auth service, if available
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

  /**
   * Starts the standard sequence and navigates to the flow sequence timer view.
   */
  startStandardSequence() {
    const standardSequence = this.settingsService.standardSequence;
    this.flowSequenceService.activeFlowSequence.set(standardSequence);
    this.flowSequenceService.resetTimer();
    this.router.navigate(['flowsequencetimer'], {
      queryParams: { id: standardSequence.id },
    });
  }

  /**
   * Starts the reverse sequence and navigates to the flow sequence timer view.
   */
  startReverseSequence() {
    const reverseSequence = this.settingsService.reverseSequence;
    this.flowSequenceService.activeFlowSequence.set(reverseSequence);
    this.flowSequenceService.resetTimer();
    this.router.navigate(['flowsequencetimer'], {
      queryParams: { id: reverseSequence.id },
    });
  }

  /**
   * Opens the settings overlay with the "timers" tab active,
   * for creating a new timer.
   */
  openCreateTimerMenu() {
    this.settingsService.activeTab = 'timers';
    this.settingsService.settingsOpen = true;
  }

  /**
   * Opens the settings overlay with the "timers" tab active,
   * for managing saved timers.
   */
  openSavedTimersMenu() {
    this.settingsService.activeTab = 'timers';
    this.settingsService.settingsOpen = true;
  }
}
