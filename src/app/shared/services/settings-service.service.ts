import { Injectable } from '@angular/core';
import { FlowSequence } from '../../models/flow-sequence.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public settingsOpen: boolean = true;

  public savedCustomSequences: FlowSequence[] = [
    new FlowSequence({ name: 'Test1', description: 'Test Description' }),
    new FlowSequence({ name: 'Test2', description: 'Test Description' }),
    new FlowSequence({ name: 'Test3', description: 'Test Description' }),
    new FlowSequence({ name: 'Test4', description: 'Test Description' }),
  ];

  constructor() {}
}
