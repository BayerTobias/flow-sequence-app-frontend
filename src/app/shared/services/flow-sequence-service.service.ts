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
  public animateBar: boolean = false;
  public firstStart: boolean = true;

  private shortBreakSound: HTMLAudioElement = new Audio(
    'assets/sounds/correct-answer.mp3'
  );
  private lognBreakSound: HTMLAudioElement = new Audio(
    'assets/sounds/dream-harp.mp3'
  );
  private flowTimeSound: HTMLAudioElement = new Audio(
    'assets/sounds/celebration-big.mp3'
  );
  private FlowSequenceSound: HTMLAudioElement = new Audio(
    'assets/sounds/big-band-celebration.mp3'
  );

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
        duration: 1.1,
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
        duration: 0.1,
      })
    );

    this.activeFlowSequence = sequence;

    console.log(sequence);
    // this.minutesRemaining =
    //   this.activeFlowSequence.steps[this.currentStepindex].duration;
    // this.secondsOfMinuteRemainung = 60;
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

      this.checkAnimateBar();
      this.isPaused = false;
      this.firstStart = false;

      this.interval = setInterval(() => {
        this.countDownSecond();

        console.log('sekunden: ', this.secondsOfMinuteRemainung);

        if (this.secondsOfMinuteRemainung === 0) {
          this.checkAnimateBar();
        }

        if (this.currentStepTimeRemaining === 0) {
          this.nextStep();
        }
      }, 1000);
    }
  }

  setupTimer() {
    console.log('setup');

    this.minutesRemaining = this.currentStep.duration;
    this.currentStepTimeRemaining = this.currentStep.duration * 60;
    this.currentStep.complete = false;
    this.sequenceComplete = false;
  }

  countDownSecond() {
    this.currentStepTimeRemaining--;
    this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60 + 1);
    this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;
  }

  clearTimerInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  completeFlowSequence() {
    this.clearTimerInterval();
    this.sequenceComplete = true;
    this.minutesRemaining = 0;
    this.secondsOfMinuteRemainung = 0;
    this.playSound();
  }

  checkAnimateBar() {
    if (
      !this.firstStart &&
      !this.isPaused &&
      this.currentStepindex !== this.activeFlowSequence.steps.length - 1
    ) {
      this.animateBar = true;
      setTimeout(() => {
        this.animateBar = false;
      }, 1000);
    }
  }

  pauseTimer() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.clearTimerInterval();
    }
  }

  nextStep() {
    if (this.currentStepindex !== this.activeFlowSequence.steps.length - 1) {
      this.clearTimerInterval();
      this.currentStep.complete = true;
      this.playSound();
      this.currentStepindex++;
      this.startStepTimer();
    } else {
      this.currentStep.complete = true;
      this.completeFlowSequence();
    }
  }

  previousStep() {
    if (this.currentStepindex !== 0) {
      if (
        this.currentStepindex === this.activeFlowSequence.steps.length - 1 &&
        this.sequenceComplete
      ) {
        this.clearTimerInterval();
        this.startStepTimer();
      } else {
        this.clearTimerInterval();
        this.currentStepindex--;
        this.startStepTimer();
      }
    }
  }

  playSound() {
    if (this.sequenceComplete) {
      this.FlowSequenceSound.play();
    } else if (this.currentStep.type === 'shortBreak') {
      this.shortBreakSound.play();
    } else if (this.currentStep.type === 'longBreak') {
      this.lognBreakSound.play();
    } else if (this.currentStep.type === 'flowTime') {
      this.flowTimeSound.play();
    }
  }
}
