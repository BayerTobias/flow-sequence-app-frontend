import { Component, inject } from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-settings-custom-timers',
  standalone: true,
  imports: [SimpleSettingsButtonComponent, DragDropModule],
  templateUrl: './settings-custom-timers.component.html',
  styleUrl: './settings-custom-timers.component.scss',
})
export class SettingsCustomTimersComponent {
  public settingsService = inject(SettingsServiceService);

  editSequence() {
    console.log('edit');
  }

  chooseSequence() {
    console.log('choose');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.settingsService.savedCustomSequences,
      event.previousIndex,
      event.currentIndex
    );
  }
}
