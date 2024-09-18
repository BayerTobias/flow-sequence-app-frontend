import { Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';
import { FlowTime } from '../../models/flow-time.model';
import { ShortBreak } from '../../models/short-break.model';
import { LongBreak } from '../../models/long-break.model';
import { Step } from '../../models/step.model';

@Injectable({
  providedIn: 'root',
})
export class FlowSequenceServiceService {
  public activeFlowSequence: FlowSequence = new FlowSequence();
  private currentStepindex: number = 0;
  private currentStepTimeRemaining: number = 0;
  public minutesRemaining: number = 0;
  public secondsOfMinuteRemainung: number = 0;
  private interval: ReturnType<typeof setInterval> | undefined;
  public sequenceComplete: boolean = false;
  private isPaused: boolean = false;
  private currentStep!: Step;

  constructor() {}

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
        duration: 2,
      })
    );

    this.activeFlowSequence = sequence;
    console.log(sequence);
  }

  startSequence() {
    if (this.activeFlowSequence.steps.length > 0) {
      this.startStepTimer();
    } else console.log('nope');
  }

  startStepTimer() {
    this.currentStep = this.activeFlowSequence.steps[this.currentStepindex];

    if (!this.interval) {
      if (!this.isPaused) {
        this.setupTimer();
      }

      this.isPaused = false;

      this.interval = setInterval(() => {
        this.countDownSecond();

        console.log('sekunden: ', this.secondsOfMinuteRemainung);

        if (this.currentStepTimeRemaining === 0) {
          this.nextStep();
        }
      }, 1000);
    }
  }

  setupTimer() {
    this.minutesRemaining = this.currentStep.duration;
    this.currentStepTimeRemaining = this.currentStep.duration * 60;
    this.currentStep.complete = false;
    this.sequenceComplete = false;
    this.countDownSecond();
  }

  countDownSecond() {
    this.currentStepTimeRemaining--;
    this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60);
    this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;
  }

  clearTimerInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  completeFlowSequence() {
    this.clearTimerInterval();
    this.sequenceComplete = true;
  }

  pauseTimer() {
    if (!this.isPaused) {
      console.log('Timer Paused');

      this.isPaused = true;
      this.clearTimerInterval();
    }
  }

  nextStep() {
    if (this.currentStepindex !== this.activeFlowSequence.steps.length - 1) {
      this.clearTimerInterval();
      this.currentStep.complete = true;
      this.currentStepindex++;
      this.startStepTimer();
    } else {
      this.currentStep.complete = true;
      this.completeFlowSequence();
    }
  }

  previousStep() {
    if (this.currentStepindex !== 0) {
      if (this.currentStepindex === this.activeFlowSequence.steps.length - 1) {
        this.clearTimerInterval();
        this.startStepTimer();
      } else {
        this.clearTimerInterval();
        this.currentStepindex--;
        this.startStepTimer();
      }
    }
  }
}
