import { Component } from '@angular/core';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { FlowTime } from '../../../models/flow-time.model';
import { ShortBreak } from '../../../models/short-break.model';
import { LongBreak } from '../../../models/long-break.model';

@Component({
  selector: 'app-flow-sequence-details',
  standalone: true,
  imports: [],
  templateUrl: './flow-sequence-details.component.html',
  styleUrl: './flow-sequence-details.component.scss',
})
export class FlowSequenceDetailsComponent {
  flowSequence: FlowSequence = new FlowSequence();

  ngOnInit() {
    // Only for Testing DELETE later
    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 3,
        complete: false,
        duration: 60,
      })
    );

    this.flowSequence.addStep(
      new ShortBreak({
        name: 'Kurze Pause',
        type: 'shortBreak',
        position: 2,
        complete: false,
        duration: 5,
      })
    );

    this.flowSequence.addStep(
      new LongBreak({
        name: 'Lange Pause',
        type: 'longBreak',
        position: 1,
        complete: false,
        duration: 30,
      })
    );

    this.flowSequence.sortSteps();
    console.log(this.flowSequence);
  }
}
