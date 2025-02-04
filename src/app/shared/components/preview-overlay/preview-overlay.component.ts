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

  ngAfterViewInit() {
    setTimeout(() => {
      this.start = true;
    }, 1);
  }

  closeOverlay() {
    this.start = false;
    setTimeout(() => {
      this.settingsService.previewOpen = false;
    }, 750);
  }
}
