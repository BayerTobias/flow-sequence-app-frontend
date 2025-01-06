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

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public appSettings = new AppSettings();
  private authService = inject(AuthService);
  private firestoreService = inject(FirestoreServiceService);

  public appSettingsSignal = signal<AppSettings>(new AppSettings());

  public activeTab: string = 'general';
  public settingsOpen: boolean = false;

  public showCountdownInBrowserTab: boolean = true;

  public reverseSequence: FlowSequence = new FlowSequence({
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
      name: 'theme2',
      accentColor: 'rgba(210, 212, 147, 1)',
      gradientColor: 'rgb(0, 28, 40) 0%',
      backgroundImage: 'assets/img/backgrounds/background-2.webp',
    }),
    new Theme({
      name: 'theme3',
      accentColor: 'rgba(200, 94, 106, 1)',
      gradientColor: 'rgb(35, 41, 41)  0%',
      backgroundImage: 'assets/img/backgrounds/background-3.webp',
    }),
  ];

  public transitionInProgress: boolean = false;

  public savedCustomSequences: FlowSequence[] = [];

  constructor() {
    this.initSettings();
    effect(
      () => {
        const user = this.authService.userSignal();

        if (user) {
          this.loadSettingsFromFirestore(user.uid);
        } else {
          this.loadSettings();
        }
      },
      { allowSignalWrites: true }
    );
  }

  async initSettings() {
    console.log('init');

    const uid = this.authService.userSignal()?.uid;

    if (uid) {
      console.log('UID');
      await this.loadSettingsFromFirestore(uid);
    } else {
      console.log('Local Storage');
      this.loadSettings();
    }
  }

  async saveSettings() {
    const uid = this.authService.userSignal()?.uid;
    console.log(uid);

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
      console.log('Settings von Firestore geladen');
    } else {
      console.error('Error Loading Settings');
    }
  }

  saveCustomSequences() {
    const sequencesAsJson = this.savedCustomSequences.map((sequence) =>
      sequence.asJson()
    );

    localStorage.setItem('customSequences', JSON.stringify(sequencesAsJson));
  }

  loadCustomSequences() {
    const sequences = localStorage.getItem('customSequences');

    if (sequences) {
      const parsedSequences = JSON.parse(sequences);

      this.savedCustomSequences = parsedSequences.map(
        (sequence: flowSequenceData) => new FlowSequence(sequence)
      );
    }
  }

  toggleFocusMode() {
    this.appSettings.focusMode = !this.appSettings.focusMode;
    this.saveSettings();
  }
}
