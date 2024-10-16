import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NotificationSound } from '../../../models/notification-sound.mode';

@Component({
  selector: 'app-settings-sound',
  standalone: true,
  imports: [DragDropModule],
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

  onDrop(event: CdkDragDrop<any[]>, targetList: string) {
    const sound = event.item.data;
    console.log(event);

    switch (targetList) {
      case 'flow':
        this.selectedFlowTimeSound = sound;
        console.log(this.selectedFlowTimeSound);

        break;
      // case 'shortBreak':
      //   this.shortBreakSounds.push(sound);
      //   break;
      // case 'longBreak':
      //   this.longBreakSounds.push(sound);
      //   break;
      default:
        console.warn('Unknown target list:', targetList);
    }
  }
}
