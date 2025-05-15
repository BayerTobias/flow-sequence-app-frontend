import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { Router } from '@angular/router';
import { CloseButtonComponent } from '../../../shared/components/buttons/close-button/close-button.component';

@Component({
  selector: 'app-flow-sequence-details',
  standalone: true,
  imports: [CommonModule, SimpleSettingsButtonComponent, CloseButtonComponent],
  templateUrl: './flow-sequence-details.component.html',
  styleUrl: './flow-sequence-details.component.scss',
})
export class FlowSequenceDetailsComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  @Input() isPreview: boolean = false;
  @Output() closeOverlayClicked = new EventEmitter<void>();

  public flowSequence: FlowSequence = new FlowSequence();
  public preview: boolean = false;

  constructor() {
    // Watches the active flow sequence signal and initializes component state
    effect(() => {
      const sequence = this.flowSequenceService.activeFlowSequence();
      this.setupSequence(sequence);
    });

    // Watches for changes to the current step index and scrolls to that step
    effect(() => {
      const index = this.flowSequenceService.stepIndexSignal();
      this.scrollToNextStep(Number(index));
    });
  }

  /**
   * Sets up the displayed flow sequence based on whether preview mode is active.
   *
   * @param sequence The currently active flow sequence.
   */
  setupSequence(sequence: FlowSequence) {
    if (
      this.settingsService.previewOpen &&
      this.flowSequenceService.previewSequence
    ) {
      this.flowSequence = this.flowSequenceService.previewSequence;
      this.preview = true;
    } else {
      this.flowSequence = sequence;
      this.preview = false;
    }
  }

  /**
   * Selects the current flow sequence, resets the timer, and navigates to the timer view.
   */
  chooseSequence() {
    const chosenSequece = this.flowSequence;
    this.flowSequenceService.activeFlowSequence.set(chosenSequece);
    this.flowSequenceService.resetTimer();
    this.settingsService.previewOpen = false;
    this.settingsService.settingsOpen = false;

    this.router.navigate(['flowsequencetimer'], {
      queryParams: { id: chosenSequece.id },
    });
  }

  /**
   * Scrolls the sequence container to the currently active step.
   *
   * @param index The index of the step to scroll to.
   */
  scrollToNextStep(index: number) {
    const steps = Array.from(document.querySelectorAll('.step-wrapper'));
    const container = document.querySelector('.sequence-box');

    if (!steps.length || !container) return;

    let lastCompletedStep: Element | null = steps[index];

    if (lastCompletedStep) {
      lastCompletedStep.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }

  /**
   * Emits an event to close the overlay component.
   */
  closeOverlay() {
    this.closeOverlayClicked.emit();
  }
}
