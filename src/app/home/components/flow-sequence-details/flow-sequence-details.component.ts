import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { FlowSequence } from '../../../models/flow-sequence.model';

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

  public flowSequence: FlowSequence = new FlowSequence();
  public preview: boolean = false;

  ngOnInit() {
    console.log('init Details');
    this.setupSequence();
  }

  setupSequence() {
    if (
      this.settingsService.previewOpen &&
      this.flowSequenceService.previewSequence
    ) {
      this.flowSequence = this.flowSequenceService.previewSequence;
      this.preview = true;
    } else {
      this.flowSequence = this.flowSequenceService.activeFlowSequence;
      this.preview = false;
    }
  }
}
