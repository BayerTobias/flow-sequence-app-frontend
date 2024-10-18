import { FlowSequence, flowSequenceData } from './flow-sequence.model';
import {
  NotificationSound,
  NotificationSoundData,
} from './notification-sound.mode';
import { Theme, ThemeData } from './theme.model';

export interface AppSettingsData {
  themeData: ThemeData;
  shortBreakSoundData: NotificationSoundData;
  lognBreakSoundData: NotificationSoundData;
  flowTimeSoundData: NotificationSoundData;
  FlowSequenceSoundData: NotificationSoundData;
  customSequenceData: string;
}

export class AppSettings {
  theme: Theme;
  shortBreakSound: NotificationSound | null;
  lognBreakSound: NotificationSound | null;
  flowTimeSound: NotificationSound | null;
  FlowSequenceSound: NotificationSound | null;
  customSequences: FlowSequence[];

  constructor(data?: AppSettingsData) {
    this.theme = data
      ? new Theme(data.themeData)
      : new Theme({
          name: 'Monstera',
          accentColor: 'rgba(106, 158, 157, 1)',
          gradientColor: 'rgb(12, 23, 19) 0%',
          backgroundImage: 'assets/img/backgrounds/background-1.webp',
        });
    this.shortBreakSound = data
      ? new NotificationSound(data.shortBreakSoundData)
      : null;
    this.lognBreakSound = data
      ? new NotificationSound(data.shortBreakSoundData)
      : null;
    this.flowTimeSound = data
      ? new NotificationSound(data.shortBreakSoundData)
      : null;
    this.FlowSequenceSound = data
      ? new NotificationSound(data.shortBreakSoundData)
      : null;
    this.customSequences = data
      ? this.setupCustomSequences(data.customSequenceData)
      : [];
  }

  setupCustomSequences(customSequenceData: string) {
    const parsedSequences = JSON.parse(customSequenceData);

    return parsedSequences.map(
      (sequence: flowSequenceData) => new FlowSequence(sequence)
    );
  }

  asJson() {
    return {
      theme: this.theme.asJson(),
    };
  }

  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.asJson()));
  }
}
