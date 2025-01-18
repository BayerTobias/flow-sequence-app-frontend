import { Component, inject } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { FlowSequenceDetailsComponent } from '../flow-sequence-details/flow-sequence-details.component';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flow-sequence-timer',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    MediaControlsComponent,
    FlowSequenceDetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './flow-sequence-timer.component.html',
  styleUrl: './flow-sequence-timer.component.scss',
})
export class FlowSequenceTimerComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public settingsService = inject(SettingsServiceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const id: number = params['id'];

      if (!id) {
        this.router.navigateByUrl('welcome');
      } else {
        const numberID = typeof id === 'string' ? Number(id) : id;
        this.matchIdAndSetupSequence(numberID);
      }
    });
  }

  matchIdAndSetupSequence(id: number) {
    const sequence = this.getSequenceById(id);

    if (sequence) {
      this.setupFlowSequence(sequence);
    } else {
      this.handleUnknownSequence();
    }
  }

  getSequenceById(id: number) {
    if (id === 2) return this.settingsService.standardSequence;
    if (id === 1) return this.settingsService.reverseSequence;

    return this.settingsService.appSettings.customSequences.find(
      (seq) => seq.id === id
    );
  }

  setupFlowSequence(sequence: any) {
    this.flowSequenceService.activeFlowSequence = sequence;
    this.flowSequenceService.setupTimer();
  }

  handleUnknownSequence() {
    console.warn('Ungültige Sequenz-ID. Navigiere zu Willkommen.');
    this.router.navigateByUrl('welcome');
  }
}
