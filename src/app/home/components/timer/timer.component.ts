import { Component, inject } from '@angular/core';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  public flowSequenceService = inject(FlowSequenceServiceService);
  public flowSequenceDetailsOpen: boolean = true;

  editTimer() {
    console.log('edit');
  }
}
