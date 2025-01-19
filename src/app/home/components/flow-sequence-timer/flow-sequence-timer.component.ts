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
  // private timeRemaining: number | null = null;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const id: number = params['id'];
      const index = params['stepIndex'];
      console.log(id, index);

      // const timeRemaining = params['timeRemaining'];

      this.flowSequenceService.clearTimerInterval();
      this.flowSequenceService.isPaused = true;

      if (!id) {
        this.router.navigateByUrl('welcome');
      } else {
        this.id = Number(id);

        if (index) {
          this.stepIndex = Number(index);
          // this.timeRemaining = Number(timeRemaining);
        } else this.stepIndex = null;

        this.matchIdAndSetupSequence();
      }
    });
  }

  ngOnInit() {
    this.flowSequenceService.clearTimerInterval();
    console.log('init');
  }

  matchIdAndSetupSequence() {
    const sequence = this.getSequenceById(this.id!);

    if (sequence) {
      this.setupFlowSequence(sequence);
    } else {
      this.handleUnknownSequence();
    }
  }

  getSequenceById(id: number) {
    if (id === 1) return this.settingsService.standardSequence;
    if (id === 2) return this.settingsService.reverseSequence;

    return this.settingsService.appSettings.customSequences.find(
      (seq) => seq.id === id
    );
  }

  setupFlowSequence(sequence: FlowSequence) {
    this.flowSequenceService.activeFlowSequence = sequence;
    if (this.stepIndex) {
      console.log('setup Step Index', this.stepIndex);

      this.flowSequenceService.currentStepindex = this.stepIndex;
    } else {
      console.log('no Step Index', this.stepIndex);

      this.flowSequenceService.currentStepindex = 0;
    }
    console.log('setup');

    this.flowSequenceService.setupTimer();
  }

  handleUnknownSequence() {
    console.warn('Invalid sequence ID. Redirecting to Welcome.');
    this.router.navigateByUrl('welcome');
  }
}
