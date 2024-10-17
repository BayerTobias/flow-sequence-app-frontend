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

  public selectedFlowTimeSound: NotificationSound | null = null;
  public selectedShortBreakSound: NotificationSound | null = null;
  public selectedLongBreakSound: NotificationSound | null = null;
  public selectedCompletedSound: NotificationSound | null = null;

  onDrop(event: CdkDragDrop<string[]>, targetList: string) {
    if (event.previousContainer === event.container) {
      return;
    }

    const sound = event.item.data;

    switch (targetList) {
      case 'flow':
        this.selectedFlowTimeSound = sound;
        break;
      case 'shortBreak':
        this.selectedShortBreakSound = sound;
        break;
      case 'longBreak':
        this.selectedLongBreakSound = sound;
        break;
      case 'completed':
        this.selectedCompletedSound = sound;
        break;
      default:
        console.warn('Unknown target list:', targetList);
    }
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
        this.selectedFlowTimeSound = null;
        break;
      case 'shortBreakArea':
        this.selectedShortBreakSound = null;
        break;
      case 'longBreakArea':
        this.selectedLongBreakSound = null;
        break;
      case 'completedArea':
        this.selectedCompletedSound = null;
        break;
      default:
        console.warn('Unknown drop Area');
    }
  }
}
