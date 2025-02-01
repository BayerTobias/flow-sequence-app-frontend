import { effect, inject, Injectable, signal } from '@angular/core';
import {
  FlowSequence,
  flowSequenceData,
} from '../../models/flow-sequence.model';
import { FlowTime } from '../../models/flow-time.model';
import { ShortBreak } from '../../models/short-break.model';
import { LongBreak } from '../../models/long-break.model';
import { Theme } from '../../models/theme.model';
import { AppSettings, AppSettingsData } from '../../models/app-settings.model';
import { FirestoreServiceService } from './firestore-service.service';
import { AuthService } from '../../auth/services/auth.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public appSettings = new AppSettings();
  private authService = inject(AuthService);
  private firestoreService = inject(FirestoreServiceService);

  public appSettingsSignal = signal<AppSettings>(new AppSettings());

  public activeTab: string = 'timers';
  public settingsOpen: boolean = true;

  public showCountdownInBrowserTab: boolean = true;

  public reverseSequence: FlowSequence = new FlowSequence({
    id: 2,
    name: 'Reverse Flow Sequence',
    description: 'reverse flow sequence customised by Katrin Wertl <3',
    steps: [
      new LongBreak({
        name: 'Relaxation - no pressure',
        type: 'longBreak',
        position: 0,
        complete: false,
        duration: 35,
      }),
      new FlowTime({
        name: 'Short Burst of Deep Work',
        type: 'flowTime',
        position: 1,
        complete: false,
        duration: 25,
      }),
      new LongBreak({
        name: 'Relaxation - no pressure',
        type: 'longBreak',
        position: 2,
        complete: false,
        duration: 35,
      }),
      new FlowTime({
        name: 'Short Burst of Deep Work',
        type: 'flowTime',
        position: 3,
        complete: false,
        duration: 25,
      }),
    ],
  });
  public standardSequence: FlowSequence = new FlowSequence({
    id: 1,
    name: 'Standard Flow Sequence',
    description: 'standard flow sequence customised by Katrin Wertl <3',
    steps: [
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 0,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 1,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 2,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 3,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 4,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 5,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 6,
        complete: false,
        duration: 25,
      }),
      new LongBreak({
        name: 'Long Break',
        type: 'longBreak',
        position: 7,
        complete: false,
        duration: 35,
      }),
    ],
  });

  public themeList: Theme[] = [
    new Theme({
      name: 'Monstera',
      accentColor: 'rgba(106, 158, 157, 1)',
      gradientColor: 'rgb(12, 23, 19) 0%',
      backgroundImage: 'assets/img/backgrounds/background-1.webp',
    }),
    new Theme({
      name: 'Orchid',
      accentColor: 'rgba(210, 212, 147, 1)',
      gradientColor: 'rgb(0, 28, 40) 0%',
      backgroundImage: 'assets/img/backgrounds/background-2.webp',
    }),
    new Theme({
      name: 'Strawflower',
      accentColor: 'rgba(200, 94, 106, 1)',
      gradientColor: 'rgb(35, 41, 41)  0%',
      backgroundImage: 'assets/img/backgrounds/background-3.webp',
    }),
  ];

  public transitionInProgress: boolean = false;

  constructor() {
    this.initSettings();
    effect(
      () => {
        const user = this.authService.userSignal();

        if (user) {
          (async () => {
            await this.loadSettingsFromFirestore(user.uid);
            await this.deleteOldCompletedSequences();
          })();
        } else {
          this.loadSettings();
        }
      },
      { allowSignalWrites: true }
    );
  }

  async initSettings() {
    const uid = this.authService.userSignal()?.uid;

    if (uid) {
      await this.loadSettingsFromFirestore(uid);
    } else {
      this.loadSettings();
    }
  }

  async deleteOldCompletedSequences() {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const now = new Date();

    const filterdSequences = this.appSettings.completedSequences.filter(
      (sequence) => {
        const completedDate = this.parseDate(sequence.completed);
        return completedDate.getTime() > now.getTime() - thirtyDaysInMs;
      }
    );

    if (
      this.appSettings.completedSequences.length !== filterdSequences.length
    ) {
      this.appSettings.completedSequences = filterdSequences;
      await this.saveSettings();
    }
  }

  parseDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  }

  async saveSettings() {
    const uid = this.authService.userSignal()?.uid;

    if (uid) {
      await this.firestoreService.saveSettings(uid, this.appSettings.asJson());
      this.setLocalStorage();
    } else {
      this.setLocalStorage();
    }

    this.appSettingsSignal.set(
      Object.assign(new AppSettings(), this.appSettings)
    );
  }

  setLocalStorage() {
    localStorage.setItem(
      'appSettings',
      JSON.stringify(this.appSettings.asJson())
    );
  }

  loadSettings() {
    const settingsString = localStorage.getItem('appSettings');

    if (settingsString) {
      const parsedSettings: AppSettingsData = JSON.parse(settingsString);
      this.appSettings = new AppSettings(parsedSettings);
      this.appSettingsSignal.set(new AppSettings(parsedSettings));
      return this.appSettings;
    }

    return new AppSettings();
  }

  async loadSettingsFromFirestore(uid: string) {
    const settings = await this.firestoreService.getSettings(uid);

    if (settings) {
      this.appSettings = new AppSettings(settings as AppSettingsData);
      this.appSettingsSignal.set(new AppSettings(settings as AppSettingsData));
      console.log('Settings von Firestore geladen', settings);
    } else {
      console.error('Error Loading Settings');
    }
  }

  toggleFocusMode() {
    this.appSettings.focusMode = !this.appSettings.focusMode;
    this.saveSettings();
  }
}
