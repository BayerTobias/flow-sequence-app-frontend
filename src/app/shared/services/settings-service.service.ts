import { Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';
import { FlowTime } from '../../models/flow-time.model';
import { ShortBreak } from '../../models/short-break.model';
import { LongBreak } from '../../models/long-break.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public activeTab: string = 'general';
  public settingsOpen: boolean = false;

  public reverseSequence: FlowSequence = new FlowSequence({
    name: 'reverse',
    description: 'reverse flow sequence customised by Katrin Wertl <3',
    steps: [
      new LongBreak({
        name: 'Relaxation - no pressure',
        type: 'longBreak',
        position: 0,
        complete: false,
        duration: 35,
      }),
      new FlowTime({
        name: 'Short Burst of Deep Work',
        type: 'flowTime',
        position: 1,
        complete: false,
        duration: 25,
      }),
      new LongBreak({
        name: 'Relaxation - no pressure',
        type: 'longBreak',
        position: 2,
        complete: false,
        duration: 35,
      }),
      new FlowTime({
        name: 'Short Burst of Deep Work',
        type: 'flowTime',
        position: 3,
        complete: false,
        duration: 25,
      }),
    ],
  });
  public standardSequence: FlowSequence = new FlowSequence({
    name: 'standad',
    description: 'standard flow sequence customised by Katrin Wertl <3',
    steps: [
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 0,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 1,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 2,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 3,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 4,
        complete: false,
        duration: 25,
      }),
      new ShortBreak({
        name: 'Short Break',
        type: 'shortBreak',
        position: 5,
        complete: false,
        duration: 5,
      }),
      new FlowTime({
        name: 'Deep Work - Flow Sequence',
        type: 'flowTime',
        position: 6,
        complete: false,
        duration: 25,
      }),
      new LongBreak({
        name: 'Long Break',
        type: 'longBreak',
        position: 7,
        complete: false,
        duration: 35,
      }),
    ],
  });

  public savedCustomSequences: FlowSequence[] = [
    new FlowSequence({ name: 'Test1', description: 'Test Description' }),
    new FlowSequence({ name: 'Test2', description: 'Test Description' }),
    new FlowSequence({ name: 'Test3', description: 'Test Description' }),
    new FlowSequence({ name: 'Test4', description: 'Test Description' }),
  ];

  constructor() {}
}
