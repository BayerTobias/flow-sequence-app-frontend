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

  /**
   * Sets or clears the name of the currently hovered control element.
   *
   * @param isHoverd Whether the element is being hovered.
   * @param element The name or identifier of the hovered element.
   */
  setHoverd(isHoverd: boolean, element: string) {
    this.hoveredElement = isHoverd ? element : null;
  }

  /**
   * Starts the flow sequence timer.
   */
  play() {
    this.flowSequenceService.startSequence();
  }

  /**
   * Pauses the flow sequence timer.
   */
  pause() {
    this.flowSequenceService.pauseTimer();
  }

  /**
   * Moves to the next step in the flow sequence.
   * If the current step is the last one, the timer is set to end immediately.
   */
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

  /**
   * Moves to the previous step in the flow sequence.
   */
  previous() {
    this.flowSequenceService.previousStep();
  }
}
