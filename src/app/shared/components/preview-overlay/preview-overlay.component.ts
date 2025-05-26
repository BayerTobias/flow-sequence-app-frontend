import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../services/settings-service.service';
import { FlowSequenceDetailsComponent } from '../../../home/components/flow-sequence-details/flow-sequence-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-overlay',
  standalone: true,
  imports: [CommonModule, FlowSequenceDetailsComponent],
  templateUrl: './preview-overlay.component.html',
  styleUrl: './preview-overlay.component.scss',
})
export class PreviewOverlayComponent {
  private settingsService = inject(SettingsServiceService);

  public start: boolean = false;

  /**
   * Starts the entry animation shortly after the view is initialized.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.start = true;
    }, 1);
  }

  /**
   * Triggers the exit animation and closes the preview overlay after a delay.
   */
  closeOverlay() {
    this.start = false;
    setTimeout(() => {
      this.settingsService.previewOpen = false;
    }, 750);
  }
}
