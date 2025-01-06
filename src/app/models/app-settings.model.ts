import { FlowSequence, flowSequenceData } from './flow-sequence.model';
import {
  NotificationSound,
  NotificationSoundData,
} from './notification-sound.mode';
import { Theme, ThemeData } from './theme.model';

export interface AppSettingsData {
  theme: ThemeData;
  countdownInBrowserTab: boolean;
  shortBreakSound: NotificationSoundData;
  longBreakSound: NotificationSoundData;
  flowTimeSound: NotificationSoundData;
  flowSequenceSound: NotificationSoundData;
  volume: number;
  customSequence: flowSequenceData[];
  focusMode: boolean;
}

export class AppSettings {
  theme: Theme;
  countdownInBrowserTab: boolean;
  shortBreakSound: NotificationSound | null;
  longBreakSound: NotificationSound | null;
  flowTimeSound: NotificationSound | null;
  flowSequenceSound: NotificationSound | null;
  volume: number;
  customSequences: FlowSequence[];
  focusMode: boolean;

  constructor(data?: AppSettingsData) {
    this.theme = data
      ? new Theme(data.theme)
      : new Theme({
          name: 'Monstera',
          accentColor: 'rgba(106, 158, 157, 1)',
          gradientColor: 'rgb(12, 23, 19) 0%',
          backgroundImage: 'assets/img/backgrounds/background-1.webp',
        });
    this.countdownInBrowserTab = data?.countdownInBrowserTab || false;
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
    this.volume = data?.volume || 50;
    this.customSequences = data?.customSequence
      ? this.setupCustomSequences(data.customSequence)
      : [];
    this.focusMode = data?.focusMode || false;
  }

  setupCustomSequences(customSequenceData: flowSequenceData[]) {
    return customSequenceData.map(
      (sequence: flowSequenceData) => new FlowSequence(sequence)
    );
  }

  customSequencesAsJson() {
    return this.customSequences.map((sequence) => sequence.asJson());
  }

  asJson() {
    return {
      theme: this.theme.asJson(),
      countdownInBrowserTab: this.countdownInBrowserTab,
      shortBreakSound: this.shortBreakSound?.asJson() || null,
      longBreakSound: this.longBreakSound?.asJson() || null,
      flowTimeSound: this.flowTimeSound?.asJson() || null,
      flowSequenceSound: this.flowSequenceSound?.asJson() || null,
      volume: this.volume,
      customSequence: this.customSequencesAsJson(),
      focusMode: this.focusMode,
    };
  }
}
