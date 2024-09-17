import { Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';
import { FlowTime } from '../../models/flow-time.model';
import { ShortBreak } from '../../models/short-break.model';
import { LongBreak } from '../../models/long-break.model';

@Injectable({
  providedIn: 'root',
})
export class FlowSequenceServiceService {
  public activeFlowSequence: FlowSequence = new FlowSequence();
  private currentStepindex: number = 0;
  private currentStepTimeRemaining: number = 0;
  public minutesRemaining: number = 0;
  public secondsOfMinuteRemainung: number = 0;
  private interval: any;

  constructor() {}

  ngOnInit() {
    this.startSequence();
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
        duration: 2,
      })
    );

    sequence.addStep(
      new ShortBreak({
        name: 'Kurze Pause',
        type: 'shortBreak',
        position: 2,
        complete: false,
        duration: 5,
      })
    );

    sequence.addStep(
      new FlowTime({
        name: 'mehr Programmieren',
        type: 'flowTime',
        position: 3,
        complete: false,
        duration: 60,
      })
    );

    sequence.addStep(
      new LongBreak({
        name: 'Lange Pause',
        type: 'longBreak',
        position: 3,
        complete: false,
        duration: 30,
      })
    );

    this.activeFlowSequence = sequence;
    console.log(sequence);
    this.startSequence();
  }

  startSequence() {
    if (this.activeFlowSequence.steps.length > 0) {
      console.log('test');

      this.startStepTimer();
    } else console.log('nope');
  }

  startStepTimer() {
    const currentStep = this.activeFlowSequence.steps[this.currentStepindex];
    this.minutesRemaining = currentStep.duration;

    this.currentStepTimeRemaining = currentStep.duration * 60;

    console.log('jap');

    this.interval = setInterval(() => {
      this.currentStepTimeRemaining--;
      this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60);
      this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;

      console.log('sekunden: ', this.secondsOfMinuteRemainung);

      if (this.currentStepTimeRemaining === 0) {
        currentStep.complete = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
