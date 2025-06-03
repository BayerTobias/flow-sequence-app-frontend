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
  public stepIndexSignal = signal<Number>(0);
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
    // Automatically update sound paths when app settings change
    effect(() => {
      const appSettings = this.settingsService.appSettingsSignal();

      this.shortBreakSound.src = appSettings.shortBreakSound?.path || '';
      this.lognBreakSound.src = appSettings.longBreakSound?.path || '';
      this.flowTimeSound.src = appSettings.flowTimeSound?.path || '';
      this.flowSequenceSound.src = appSettings.flowSequenceSound?.path || '';
    });
  }

  /**
   * Starts the sequence timer if steps are defined.
   */
  startSequence() {
    if (this.activeFlowSequence().steps.length > 0) {
      this.startStepTimer();
    }
  }

  /**
   * Starts the timer for the current step.
   */
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

  /**
   * Initializes the timer and step state.
   */
  setupTimer() {
    this.currentStep = this.activeFlowSequence().steps[this.currentStepindex];
    this.stepIndexSignal.set(this.currentStepindex);
    this.minutesRemaining = this.currentStep.duration;
    this.currentStepTimeRemaining = this.currentStep.duration * 60;
    this.currentStep.complete = false;
    this.sequenceComplete = false;
    this.updateStepStatuses();
  }

  /**
   * Resets the timer and step state to the beginning of the sequence.
   */
  resetTimer() {
    this.currentStepindex = 0;
    this.activeFlowSequence().steps.forEach((step) => {
      step.complete = false;
    });
    this.setupTimer();
    this.setQueryParams();
  }

  /**
   * Decrements the timer by one second and updates the browser tab title.
   */
  countDownSecond() {
    this.currentStepTimeRemaining--;
    this.minutesRemaining = Math.floor(this.currentStepTimeRemaining / 60);
    this.secondsOfMinuteRemainung = this.currentStepTimeRemaining % 60;
    this.setQueryParams();
    if (this.settingsService.appSettings.countdownInBrowserTab) {
      document.title = ` ${this.minutesRemaining}min ${this.secondsOfMinuteRemainung}sec `;
    } else {
      document.title = 'FlowSeq';
    }
  }

  /**
   * Updates the query params with the current step index.
   */
  setQueryParams() {
    const baseUrl = this.location.path();
    const fullUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(fullUrl.search);
    searchParams.set('stepIndex', String(this.currentStepindex));

    this.location.replaceState(
      `${baseUrl.split('?')[0]}?${searchParams.toString()}`
    );
  }

  /**
   * Clears the active interval timer.
   */
  clearTimerInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  /**
   * Completes the entire sequence, resets timers, uploads stats and plays a sound.
   */
  async completeFlowSequence() {
    this.clearTimerInterval();
    this.sequenceComplete = true;
    this.isPaused = true;
    this.currentStepTimeRemaining = 0;
    this.minutesRemaining = 0;
    this.secondsOfMinuteRemainung = 0;
    await this.uploadCompletedSequence();
    this.playSound();
    if (this.settingsService.showCountdownInBrowserTab) {
      document.title = `Flow sequence Completed`;
    } else {
      document.title = 'FlowSeq';
    }
  }

  /**
   * Uploads the completed sequence data to the app settings.
   */
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

  /**
   * Enables a bar animation when transitioning between steps.
   */
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

  /**
   * Pauses the active timer.
   */
  pauseTimer() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.clearTimerInterval();
    }
  }

  /**
   * Moves to the next step or completes the sequence if at the end.
   */
  nextStep() {
    if (this.currentStepindex !== this.activeFlowSequence().steps.length - 1) {
      this.clearTimerInterval();
      this.currentStep.complete = true;
      this.playSound();
      this.currentStepindex++;
      this.startStepTimer();
      this.stepIndexSignal.set(this.currentStepindex);
    } else {
      this.currentStep.complete = true;
      this.completeFlowSequence();
    }
  }

  /**
   * Goes back to the previous step.
   */
  previousStep() {
    if (this.currentStepindex !== 0) {
      if (
        this.currentStepindex === this.activeFlowSequence().steps.length - 1 &&
        this.sequenceComplete
      ) {
        this.clearTimerInterval();
        this.startStepTimer();
        this.stepIndexSignal.set(this.currentStepindex);
      } else {
        this.clearTimerInterval();
        this.currentStepindex--;
        this.startStepTimer();
        this.stepIndexSignal.set(this.currentStepindex);
      }
    }
  }

  /**
   * Restarts a specific step by index.
   *
   * @param index - The index of the step to restart.
   */
  restartStep(index: number) {
    this.pauseTimer();
    this.currentStepindex = index;
    this.setupTimer();
    this.updateStepStatuses();
    this.stepIndexSignal.set(this.currentStepindex);
  }

  /**
   * Updates the `complete` status of each step based on the current index.
   */
  updateStepStatuses() {
    this.activeFlowSequence().steps.forEach((step, index) => {
      if (index < this.currentStepindex) {
        step.complete = true;
      } else {
        step.complete = false;
      }
    });
  }

  /**
   * Gets the volume level based on settings.
   */
  get soundVolume() {
    return this.settingsService.appSettings.volume / 100;
  }

  /**
   * Plays the corresponding sound for the current step or when the sequence ends.
   */
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
