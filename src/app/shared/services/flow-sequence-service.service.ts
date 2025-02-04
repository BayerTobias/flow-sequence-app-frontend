import { effect, inject, Injectable, signal } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';
import { Step } from '../../models/step.model';
import { SettingsServiceService } from './settings-service.service';
import { Location } from '@angular/common';
import { CompletedSequence } from '../../models/completed-sequence.model';

@Injectable({
  providedIn: 'root',
})
export class FlowSequenceServiceService {
  private settingsService = inject(SettingsServiceService);
  private location = inject(Location);

  public activeFlowSequence = signal<FlowSequence>(new FlowSequence());
  public previewSequence: FlowSequence | null = null;
  public currentStepindex: number = 0;
  public currentStepTimeRemaining: number = 0;
  public minutesRemaining: number = 0;
  public secondsOfMinuteRemainung: number = 0;
  public interval: ReturnType<typeof setInterval> | undefined;
  public sequenceComplete: boolean = false;
  public isPaused: boolean = true;
  public currentStep!: Step;
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
    if (this.activeFlowSequence().steps.length > 0) {
      this.startStepTimer();
    } else console.log('nope');
  }

  startStepTimer() {
    this.currentStep = this.activeFlowSequence().steps[this.currentStepindex];

    if (!this.interval) {
      if (!this.isPaused) {
        this.setupTimer();
      }

      this.checkAnimateBar();
      this.isPaused = false;
      this.firstStart = false;

      this.interval = setInterval(() => {
        this.countDownSecond();

        if (this.currentStepTimeRemaining === 0) {
          this.nextStep();
        }
      }, 1000);
    }
  }

  setupTimer() {
    this.currentStep = this.activeFlowSequence().steps[this.currentStepindex];
    this.minutesRemaining = this.currentStep.duration;
    this.currentStepTimeRemaining = this.currentStep.duration * 60;
    this.currentStep.complete = false;
    this.sequenceComplete = false;
    this.updateStepStatuses();
  }

  // setupQeryParamTimer(stepIndex: number) {
  //   this.currentStepindex = stepIndex;
  //   this.currentStep = this.activeFlowSequence.steps[this.currentStepindex];
  //   this.currentStepTimeRemaining = timeRemaining;
  //   this.minutesRemaining = Math.floor(timeRemaining / 60);
  //   this.currentStep.complete = false;
  //   this.sequenceComplete = false;
  //   this.updateStepStatuses();
  // }

  resetTimer() {
    this.currentStepindex = 0;
    this.activeFlowSequence().steps.forEach((step) => {
      step.complete = false;
    });
    this.setupTimer();
  }

  countDownSecond() {
    this.currentStepTimeRemaining--;
    this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60);
    this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;
    this.setQueryParams();
    if (this.settingsService.appSettings.countdownInBrowserTab) {
      document.title = ` ${this.minutesRemaining}min ${this.secondsOfMinuteRemainung}sec `;
    } else {
      document.title = 'FlowSequenceFrontend';
    }
  }

  setQueryParams() {
    const baseUrl = this.location.path();
    const fullUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(fullUrl.search);

    searchParams.set('stepIndex', String(this.currentStepindex));
    // searchParams.set('timeRemaining', String(this.currentStepTimeRemaining));

    this.location.replaceState(
      `${baseUrl.split('?')[0]}?${searchParams.toString()}`
    );
  }

  clearTimerInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  async completeFlowSequence() {
    this.clearTimerInterval();
    this.sequenceComplete = true;
    this.currentStepTimeRemaining = 0;
    this.minutesRemaining = 0;
    this.secondsOfMinuteRemainung = 0;
    await this.uploadCompletedSequence();
    this.playSound();
    if (this.settingsService.showCountdownInBrowserTab) {
      document.title = `Flow sequence Completed`;
    } else {
      document.title = 'FlowSequenceFrontend';
    }
  }

  async uploadCompletedSequence() {
    const data = new CompletedSequence();
    const date = new Date();

    data.name = this.activeFlowSequence().name;
    data.completed = date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    data.duration = this.activeFlowSequence().steps.reduce(
      (totalDuration, step) => {
        return totalDuration + step.duration;
      },
      0
    );

    this.settingsService.appSettings.completedSequences.push(data);

    await this.settingsService.saveSettings();
  }

  checkAnimateBar() {
    if (
      !this.firstStart &&
      !this.isPaused &&
      this.currentStepindex !== this.activeFlowSequence().steps.length - 1
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
    if (this.currentStepindex !== this.activeFlowSequence().steps.length - 1) {
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
        this.currentStepindex === this.activeFlowSequence().steps.length - 1 &&
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

  restartStep(index: number) {
    this.pauseTimer();
    this.currentStepindex = index;
    this.setupTimer();
    this.updateStepStatuses();
  }

  updateStepStatuses() {
    this.activeFlowSequence().steps.forEach((step, index) => {
      if (index < this.currentStepindex) {
        step.complete = true;
      } else {
        step.complete = false;
      }
    });
  }

  get soundVolume() {
    return this.settingsService.appSettings.volume / 100;
  }

  playSound() {
    if (this.sequenceComplete) {
      this.flowSequenceSound.volume = this.soundVolume;
      this.flowSequenceSound.play();
    } else if (this.currentStep.type === 'shortBreak') {
      this.shortBreakSound.volume = this.soundVolume;
      this.shortBreakSound.play();
    } else if (this.currentStep.type === 'longBreak') {
      this.lognBreakSound.volume = this.soundVolume;
      this.lognBreakSound.play();
    } else if (this.currentStep.type === 'flowTime') {
      this.flowTimeSound.volume = this.soundVolume;
      this.flowTimeSound.play();
    }
  }
}
