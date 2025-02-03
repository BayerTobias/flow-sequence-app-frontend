import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../services/settings-service.service';
import { FlowSequenceDetailsComponent } from '../../../home/components/flow-sequence-details/flow-sequence-details.component';

@Component({
  selector: 'app-preview-overlay',
  standalone: true,
  imports: [FlowSequenceDetailsComponent],
  templateUrl: './preview-overlay.component.html',
  styleUrl: './preview-overlay.component.scss',
})
export class PreviewOverlayComponent {
  private settingsService = inject(SettingsServiceService);

  closeOverlay() {
    console.log('close');

    this.settingsService.previewOpen = false;
  }
}
