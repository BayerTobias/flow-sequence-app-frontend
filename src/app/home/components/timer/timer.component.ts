import { Component, inject } from '@angular/core';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { CommonModule } from '@angular/common';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  public settingsService = inject(SettingsServiceService);
  public flowSequenceService = inject(FlowSequenceServiceService);
  public flowSequenceDetailsOpen: boolean = true;

  editTimer() {
    console.log('edit');
  }
}
