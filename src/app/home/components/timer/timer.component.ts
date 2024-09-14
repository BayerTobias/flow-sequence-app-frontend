import { Component } from '@angular/core';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { FlowTime } from '../../../models/flow-time.model';
import { ShortBreak } from '../../../models/short-break.model';
import { LongBreak } from '../../../models/long-break.model';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  flowSequence: FlowSequence = new FlowSequence();

  ngOnInit() {
    // Only for Testing DELETE later
    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
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
        position: 4,
        complete: false,
        duration: 30,
      })
    );

    console.log(this.flowSequence);
  }

  editTimer() {
    console.log('edit');
  }
}
