import { Component, inject } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { FlowSequenceDetailsComponent } from '../flow-sequence-details/flow-sequence-details.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsOverlayComponent } from '../../../settings/components/settings-overlay/settings-overlay.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../auth/services/auth.service';
import { GoogleCalendarService } from '../../../shared/services/google-calendar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeComponent,
    TimerComponent,
    MediaControlsComponent,
    FlowSequenceDetailsComponent,
    SettingsOverlayComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  public authService = inject(AuthService);
  public calendarService = inject(GoogleCalendarService);

  async ngOnInit() {
    this.authService.getUserInfo();
  }
}
