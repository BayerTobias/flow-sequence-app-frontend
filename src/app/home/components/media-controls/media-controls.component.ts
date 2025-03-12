import { Component, inject } from '@angular/core';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { CommonModule } from '@angular/common';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-controls.component.html',
  styleUrl: './media-controls.component.scss',
})
export class MediaControlsComponent {
  public settingsService = inject(SettingsServiceService);
  public flowSequenceService = inject(FlowSequenceServiceService);
  public playButton: boolean = true;
  public hoveredElement: string | null = null;

  setHoverd(isHoverd: boolean, element: string) {
    this.hoveredElement = isHoverd ? element : null;
  }

  play() {
    this.flowSequenceService.startSequence();
  }

  pause() {
    this.flowSequenceService.pauseTimer();
  }

  next() {
    if (
      this.flowSequenceService.currentStepindex ===
      this.flowSequenceService.activeFlowSequence().steps.length - 1
    ) {
      this.flowSequenceService.currentStepTimeRemaining = 1;
      this.flowSequenceService.secondsOfMinuteRemainung = 1;
      this.flowSequenceService.minutesRemaining = 0;
    } else {
      this.flowSequenceService.nextStep();
    }
  }

  previous() {
    this.flowSequenceService.previousStep();
  }
}
