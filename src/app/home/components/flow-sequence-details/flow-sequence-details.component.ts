import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';

@Component({
  selector: 'app-flow-sequence-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flow-sequence-details.component.html',
  styleUrl: './flow-sequence-details.component.scss',
})
export class FlowSequenceDetailsComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);

  ngOnInit() {}
}
