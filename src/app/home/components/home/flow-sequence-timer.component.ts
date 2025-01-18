import { Component, inject } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { FlowSequenceDetailsComponent } from '../flow-sequence-details/flow-sequence-details.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { SettingsOverlayComponent } from '../../../settings/components/settings-overlay/settings-overlay.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-flow-sequence-timer',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    MediaControlsComponent,
    FlowSequenceDetailsComponent,
    SettingsOverlayComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './flow-sequence-timer.component.html',
  styleUrl: './flow-sequence-timer.component.scss',
})
export class FlowSequenceTimerComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);

  async ngOnInit() {}
}
