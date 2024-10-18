import { FlowSequence, flowSequenceData } from './flow-sequence.model';
import {
  NotificationSound,
  NotificationSoundData,
} from './notification-sound.mode';
import { Theme, ThemeData } from './theme.model';

export interface AppSettingsData {
  theme: ThemeData;
  shortBreakSound: NotificationSoundData;
  longBreakSound: NotificationSoundData;
  flowTimeSound: NotificationSoundData;
  flowSequenceSound: NotificationSoundData;
  customSequence: string;
}

export class AppSettings {
  theme: Theme;
  shortBreakSound: NotificationSound | null;
  longBreakSound: NotificationSound | null;
  flowTimeSound: NotificationSound | null;
  flowSequenceSound: NotificationSound | null;
  // customSequences: FlowSequence[];

  constructor(data?: AppSettingsData) {
    this.theme = data
      ? new Theme(data.theme)
      : new Theme({
          name: 'Monstera',
          accentColor: 'rgba(106, 158, 157, 1)',
          gradientColor: 'rgb(12, 23, 19) 0%',
          backgroundImage: 'assets/img/backgrounds/background-1.webp',
        });
    this.shortBreakSound = data?.shortBreakSound
      ? new NotificationSound(data.shortBreakSound)
      : null;
    this.longBreakSound = data?.longBreakSound
      ? new NotificationSound(data.longBreakSound)
      : null;
    this.flowTimeSound = data?.flowTimeSound
      ? new NotificationSound(data.flowTimeSound)
      : null;
    this.flowSequenceSound = data?.flowSequenceSound
      ? new NotificationSound(data.flowSequenceSound)
      : null;
    // this.customSequences = data
    //   ? this.setupCustomSequences(data.customSequence)
    //   : [];
  }

  setupCustomSequences(customSequenceData: string) {
    // const parsedSequences = JSON.parse(customSequenceData);
    // return parsedSequences.map(
    //   (sequence: flowSequenceData) => new FlowSequence(sequence)
    // );
  }

  asJson() {
    return {
      theme: this.theme.asJson(),
      shortBreakSound: this.shortBreakSound?.asJson(),
      longBreakSound: this.longBreakSound?.asJson(),
      flowTimeSound: this.flowTimeSound?.asJson(),
      flowSequenceSound: this.flowSequenceSound?.asJson(),
    };
  }

  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.asJson()));
  }
}
