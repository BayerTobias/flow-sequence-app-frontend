import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { CompletedSequence } from '../../../models/completed-sequence.model';

@Component({
  selector: 'app-settings-completed-sequences',
  standalone: true,
  imports: [],
  templateUrl: './settings-completed-sequences.component.html',
  styleUrl: './settings-completed-sequences.component.scss',
})
export class SettingsCompletedSequencesComponent {
  public settingsService = inject(SettingsServiceService);

  /**
   * Formats the completed date string by removing the comma.
   * @param sequence - The completed sequence to format.
   * @returns A cleaned-up completed date string.
   */
  formatCompleted(sequence: CompletedSequence) {
    const formattedCompleted = sequence.completed.replace(',', '');

    return formattedCompleted;
  }

  /**
   * Formats the duration of the sequence in "H:MMh" format.
   * @param sequence - The completed sequence to format.
   * @returns A string representation of the duration.
   */
  public formatDuration(sequence: CompletedSequence): string {
    const totalMinutes = sequence.duration;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedDuration = `${hours}:${String(minutes).padStart(2, '0')}h`;
    return formattedDuration;
  }
}
