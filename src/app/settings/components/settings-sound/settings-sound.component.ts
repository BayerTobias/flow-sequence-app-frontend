import { Component, DEFAULT_CURRENCY_CODE, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  CdkDragEnd,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NotificationSound } from '../../../models/notification-sound.mode';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-sound',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatSliderModule, FormsModule],
  templateUrl: './settings-sound.component.html',
  styleUrl: './settings-sound.component.scss',
})
export class SettingsSoundComponent {
  public settingsService = inject(SettingsServiceService);

  public shortSounds: NotificationSound[] = [
    new NotificationSound({
      name: 'Sahara',
      path: 'assets/sounds/middle_east_short_01.wav',
    }),
    new NotificationSound({
      name: 'Sakura',
      path: 'assets/sounds/far_east_short_01.wav',
    }),
    new NotificationSound({
      name: 'Modern',
      path: 'assets/sounds/chime_short_01.wav',
    }),
    new NotificationSound({
      name: 'Simple',
      path: 'assets/sounds/chime_short_02.wav',
    }),
    new NotificationSound({
      name: 'Harp',
      path: 'assets/sounds/harp_short_01.wav',
    }),
  ];
  public longSounds: NotificationSound[] = [
    new NotificationSound({
      name: 'Tibet',
      path: 'assets/sounds/far_east_long_01.wav',
    }),
    new NotificationSound({
      name: 'Harp Intro',
      path: 'assets/sounds/harp_long_01.wav',
    }),
    new NotificationSound({
      name: 'Harp Rise',
      path: 'assets/sounds/harp_long_02.wav',
    }),
  ];
  public fanfareSounds: NotificationSound[] = [
    new NotificationSound({
      name: 'Cartoon',
      path: 'assets/sounds/fanfare_cartoon.wav',
    }),
    new NotificationSound({
      name: 'Desert',
      path: 'assets/sounds/fanfare_middle_east.wav',
    }),
    new NotificationSound({
      name: 'Tuba',
      path: 'assets/sounds/fanfare_modern.wav',
    }),
    new NotificationSound({
      name: 'Drumroll',
      path: 'assets/sounds/fanfare_drumroll.wav',
    }),
    new NotificationSound({
      name: 'Epic',
      path: 'assets/sounds/fanfare_epic.wav',
    }),
  ];

  public volumeLevel: number = 0;

  public get selectedFlowTimeSound(): NotificationSound | null {
    return this.settingsService.appSettings.flowTimeSound;
  }

  public get selectedShortBreakSound(): NotificationSound | null {
    return this.settingsService.appSettings.shortBreakSound;
  }

  public get selectedLongBreakSound(): NotificationSound | null {
    return this.settingsService.appSettings.longBreakSound;
  }

  public get selectedCompletedSound(): NotificationSound | null {
    return this.settingsService.appSettings.flowSequenceSound;
  }

  constructor() {
    this.volumeLevel = this.settingsService.appSettings.volume;
  }

  /**
   * Handles drop event and assigns the dragged sound to the appropriate sound setting.
   */
  onDrop(event: CdkDragDrop<string[]>, targetList: string) {
    if (event.previousContainer === event.container) {
      return;
    }

    const sound = event.item.data;

    switch (targetList) {
      case 'flow':
        this.settingsService.appSettings.flowTimeSound = sound;

        break;
      case 'shortBreak':
        this.settingsService.appSettings.shortBreakSound = sound;

        break;
      case 'longBreak':
        this.settingsService.appSettings.longBreakSound = sound;

        break;
      case 'completed':
        this.settingsService.appSettings.flowSequenceSound = sound;

        break;
      default:
        console.warn('Unknown target list:', targetList);
    }

    this.settingsService.saveSettings();
  }

  /**
   * Checks whether a sound was dropped outside the designated drop area and removes it if so.
   */
  checkDropOutside(event: CdkDragEnd, dropAreaId: string) {
    const { x, y } = event.dropPoint;
    const dropTarget = document.elementFromPoint(x, y);

    if (!dropTarget || !dropTarget.closest('#' + dropAreaId)) {
      this.removeSoundFromFlow(dropAreaId);
    }
  }

  /**
   * Removes the currently assigned sound from the specified flow step.
   */
  removeSoundFromFlow(dropAreaId: string) {
    switch (dropAreaId) {
      case 'flowArea':
        this.settingsService.appSettings.flowTimeSound = null;
        break;
      case 'shortBreakArea':
        this.settingsService.appSettings.shortBreakSound = null;
        break;
      case 'longBreakArea':
        this.settingsService.appSettings.longBreakSound = null;
        break;
      case 'completedArea':
        this.settingsService.appSettings.flowSequenceSound = null;
        break;
      default:
        console.warn('Unknown drop Area');
    }

    this.settingsService.saveSettings();
  }

  /**
   * Plays the specified notification sound.
   */
  playSound(sound: NotificationSound) {
    const audio = new Audio(sound.path);
    audio.volume = this.settingsService.appSettings.volume / 100;

    audio.play();
  }

  /**
   * Saves the new volume setting to the app settings.
   */
  async changeVolume() {
    this.settingsService.appSettings.volume = this.volumeLevel;
    await this.settingsService.saveSettings();
  }
}
