import { Component, DEFAULT_CURRENCY_CODE, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  CdkDragEnd,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NotificationSound } from '../../../models/notification-sound.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-sound',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './settings-sound.component.html',
  styleUrl: './settings-sound.component.scss',
})
export class SettingsSoundComponent {
  public settingsService = inject(SettingsServiceService);
  public longSounds: NotificationSound[] = [
    new NotificationSound({
      name: 'Big Band',
      path: 'assets/sounds/big-band-celebration.mp3',
    }),
    new NotificationSound({
      name: 'Celebration',
      path: 'assets/sounds/celebration-big.mp3',
    }),
    new NotificationSound({
      name: 'Correct Answer',
      path: 'assets/sounds/correct-answer.mp3',
    }),
    new NotificationSound({
      name: 'Dream Harp',
      path: 'assets/sounds/dream-harp.mp3',
    }),
  ];
  public shortSounds: NotificationSound[] = [];

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
    console.log(this.selectedFlowTimeSound);
  }

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

  checkDropOutside(event: CdkDragEnd, dropAreaId: string) {
    const { x, y } = event.dropPoint;
    const dropTarget = document.elementFromPoint(x, y);

    if (!dropTarget || !dropTarget.closest('#' + dropAreaId)) {
      this.removeSoundFromFlow(dropAreaId);
    }
  }

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
}
