import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flow-sequence-details',
  standalone: true,
  imports: [CommonModule, SimpleSettingsButtonComponent],
  templateUrl: './flow-sequence-details.component.html',
  styleUrl: './flow-sequence-details.component.scss',
})
export class FlowSequenceDetailsComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public flowSequence: FlowSequence = new FlowSequence();
  public preview: boolean = false;

  constructor() {
    effect(() => {
      const sequence = this.flowSequenceService.activeFlowSequence();
      this.setupSequence(sequence);
    });

    effect(() => {
      const index = this.flowSequenceService.stepIndexSignal();
      this.scrollToNextStep(Number(index));
    });
  }

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
}
