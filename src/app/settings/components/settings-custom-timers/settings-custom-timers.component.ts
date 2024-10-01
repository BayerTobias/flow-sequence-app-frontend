import { Component, inject } from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings-custom-timers',
  standalone: true,
  imports: [
    SimpleSettingsButtonComponent,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './settings-custom-timers.component.html',
  styleUrl: './settings-custom-timers.component.scss',
})
export class SettingsCustomTimersComponent {
  public settingsService = inject(SettingsServiceService);

  public flowTimeDuration: number = 25;
  public shortBreakDuration: number = 5;
  public longBreakDuration: number = 15;

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

  addFlowTime() {
    console.log('Flow Time:', this.flowTimeDuration);
  }

  addShortBreak() {
    console.log('Short Break:', this.shortBreakDuration);
  }

  addLongBreak() {
    console.log('Long Break:', this.longBreakDuration);
  }
}
