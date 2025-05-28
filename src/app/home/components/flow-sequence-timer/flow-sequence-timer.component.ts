import { Component, inject } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { FlowSequenceDetailsComponent } from '../flow-sequence-details/flow-sequence-details.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { SequenceCompleteComponent } from '../sequence-complete/sequence-complete.component';

@Component({
  selector: 'app-flow-sequence-timer',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    MediaControlsComponent,
    FlowSequenceDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SequenceCompleteComponent,
  ],
  templateUrl: './flow-sequence-timer.component.html',
  styleUrl: './flow-sequence-timer.component.scss',
})
export class FlowSequenceTimerComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private id: number | null = null;
  private stepIndex: number | null = null;

  constructor() {
    // Subscribes to query parameters and initializes the flow sequence accordingly
    this.route.queryParams.subscribe((params) => {
      const id: number = params['id'];
      const index = params['stepIndex'];

      // Clear any running timer and pause the sequence
      this.flowSequenceService.clearTimerInterval();
      this.flowSequenceService.isPaused = true;

      // Redirect to welcome if no valid sequence ID is provided
      if (!id) {
        this.router.navigateByUrl('welcome');
      } else {
        this.id = Number(id);
        if (index) {
          this.stepIndex = Number(index);
        } else this.stepIndex = null;
        this.matchIdAndSetupSequence();
      }
    });
  }

  /**
   * Clears any running timer on component initialization.
   */
  ngOnInit() {
    this.flowSequenceService.clearTimerInterval();
  }

  /**
   * Matches the sequence ID with available sequences and initializes the timer.
   */
  matchIdAndSetupSequence() {
    const sequence = this.getSequenceById(this.id!);

    if (sequence) {
      this.setupFlowSequence(sequence);
    } else {
      this.handleUnknownSequence();
    }
  }

  /**
   * Returns a sequence by ID from either standard, reverse, or custom sequences.
   *
   * @param id The ID of the sequence to retrieve.
   * @returns The matching FlowSequence object, or undefined if not found.
   */
  getSequenceById(id: number) {
    if (id === 1) return this.settingsService.standardSequence;
    if (id === 2) return this.settingsService.reverseSequence;

    return this.settingsService.appSettings.customSequences.find(
      (seq) => seq.id === id
    );
  }

  /**
   * Sets the active flow sequence and initializes the current step and timer.
   *
   * @param sequence The FlowSequence to set up.
   */
  setupFlowSequence(sequence: FlowSequence) {
    this.flowSequenceService.activeFlowSequence.set(sequence);
    if (this.stepIndex) {
      this.flowSequenceService.currentStepindex = this.stepIndex;
    } else {
      this.flowSequenceService.currentStepindex = 0;
    }
    this.flowSequenceService.setupTimer();
  }

  /**
   * Handles the case when no valid sequence is found by redirecting the user.
   */
  handleUnknownSequence() {
    console.warn('Invalid sequence ID. Redirecting to Welcome.');
    this.router.navigateByUrl('welcome');
  }
}
