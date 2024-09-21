import { Component, inject } from '@angular/core';
import { GlassButtonComponent } from '../../../shared/components/buttons/glass-button/glass-button.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { FlowTime } from '../../../models/flow-time.model';
import { ShortBreak } from '../../../models/short-break.model';
import { LongBreak } from '../../../models/long-break.model';
import { FlowSequence } from '../../../models/flow-sequence.model';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [GlassButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private flowSequenceService = inject(FlowSequenceServiceService);
  private testSequence: FlowSequence = new FlowSequence();

  ngOnInit() {
    this.createDummyFlowSequence();
  }

  startStandardTimer() {
    const step1 = this.testSequence.steps[0];
    this.flowSequenceService.activeFlowSequence = this.testSequence;
    this.flowSequenceService.minutesRemaining = step1.duration;
    this.flowSequenceService.secondsOfMinuteRemainung = 60;
  }

  startStandardReverse() {
    console.log('Standard Reverse');
  }

  openCreateTimerMenu() {
    console.log('Create Timer');
  }

  openSavedTimersMenu() {
    console.log('Browse Timer');
  }

  createDummyFlowSequence() {
    const sequence = new FlowSequence();
    sequence.name = 'Test flow sequence';

    sequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
        complete: false,
        duration: 1,
      })
    );

    sequence.addStep(
      new ShortBreak({
        name: 'Kurze Pause',
        type: 'shortBreak',
        position: 2,
        complete: false,
        duration: 2,
      })
    );

    sequence.addStep(
      new FlowTime({
        name: 'mehr Programmieren',
        type: 'flowTime',
        position: 3,
        complete: false,
        duration: 2,
      })
    );

    sequence.addStep(
      new LongBreak({
        name: 'Lange Pause',
        type: 'longBreak',
        position: 3,
        complete: false,
        duration: 1,
      })
    );

    console.log(sequence);
    this.testSequence = sequence;
    // this.minutesRemaining =
    //   this.activeFlowSequence.steps[this.currentStepindex].duration;
    // this.secondsOfMinuteRemainung = 60;
  }
}
