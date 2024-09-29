import { Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public settingsOpen: boolean = true;

  public savedCustomSequences: FlowSequence[] = [
    new FlowSequence({ name: 'Test1' }),
    new FlowSequence({ name: 'Test2' }),
    new FlowSequence({ name: 'Test3' }),
    new FlowSequence({ name: 'Test4' }),
  ];

  constructor() {}
}
