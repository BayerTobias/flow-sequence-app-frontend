import { Component } from '@angular/core';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { FlowTime } from '../../../models/flow-time.model';
import { ShortBreak } from '../../../models/short-break.model';
import { LongBreak } from '../../../models/long-break.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flow-sequence-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flow-sequence-details.component.html',
  styleUrl: './flow-sequence-details.component.scss',
})
export class FlowSequenceDetailsComponent {
  public flowSequence: FlowSequence = new FlowSequence();

  public completeColor: string = 'rgb(106, 158, 157)';

  ngOnInit() {
    // Only for Testing DELETE later
    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
        complete: true,
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
        position: 3,
        complete: false,
        duration: 30,
      })
    );

    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
        complete: true,
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
        position: 3,
        complete: false,
        duration: 30,
      })
    );

    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
        complete: true,
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
        position: 3,
        complete: false,
        duration: 30,
      })
    );

    this.flowSequence.addStep(
      new FlowTime({
        name: 'Programmieren',
        type: 'flowTime',
        position: 1,
        complete: true,
        duration: 60,
      })
    );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );
    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new FlowTime({
    //     name: 'Programmieren',
    //     type: 'flowTime',
    //     position: 1,
    //     complete: true,
    //     duration: 60,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new ShortBreak({
    //     name: 'Kurze Pause',
    //     type: 'shortBreak',
    //     position: 2,
    //     complete: false,
    //     duration: 5,
    //   })
    // );

    // this.flowSequence.addStep(
    //   new LongBreak({
    //     name: 'Lange Pause',
    //     type: 'longBreak',
    //     position: 3,
    //     complete: false,
    //     duration: 30,
    //   })
    // );

    this.flowSequence.sortSteps();
    console.log(this.flowSequence);
  }
}
