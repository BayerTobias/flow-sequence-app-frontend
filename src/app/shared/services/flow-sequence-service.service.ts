import { effect, inject, Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';
import { Step } from '../../models/step.model';
import { SettingsServiceService } from './settings-service.service';
import { AppSettings } from '../../models/app-settings.model';

@Injectable({
  providedIn: 'root',
})
export class FlowSequenceServiceService {
  private settingsService = inject(SettingsServiceService);

  public activeFlowSequence!: FlowSequence;
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

  private shortBreakSound: HTMLAudioElement = new Audio();
  private lognBreakSound: HTMLAudioElement = new Audio();
  private flowTimeSound: HTMLAudioElement = new Audio();
  private flowSequenceSound: HTMLAudioElement = new Audio();

  constructor() {
    effect(() => {
      const appSettings = this.settingsService.appSettingsSignal();

      this.shortBreakSound.src = appSettings.shortBreakSound?.path || '';
      this.lognBreakSound.src = appSettings.longBreakSound?.path || '';
      this.flowTimeSound.src = appSettings.flowTimeSound?.path || '';
      this.flowSequenceSound.src = appSettings.flowSequenceSound?.path || '';
    });
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
    this.minutesRemaining = this.currentStep.duration;
    this.currentStepTimeRemaining = this.currentStep.duration * 60;
    this.currentStep.complete = false;
    this.sequenceComplete = false;
  }

  countDownSecond() {
    this.currentStepTimeRemaining--;
    this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60 + 1);
    this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;
    if (this.settingsService.appSettings.countdownInBrowserTab) {
      document.title = ` ${this.minutesRemaining}min ${this.secondsOfMinuteRemainung}sec `;
    } else {
      document.title = 'FlowSequenceFrontend';
    }
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
    if (this.settingsService.showCountdownInBrowserTab) {
      document.title = `Flow sequence Completed`;
    } else {
      document.title = 'FlowSequenceFrontend';
    }
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
      }, 1001);
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
      this.flowSequenceSound.play();
    } else if (this.currentStep.type === 'shortBreak') {
      this.shortBreakSound.play();
    } else if (this.currentStep.type === 'longBreak') {
      this.lognBreakSound.play();
    } else if (this.currentStep.type === 'flowTime') {
      this.flowTimeSound.play();
    }
  }
}
