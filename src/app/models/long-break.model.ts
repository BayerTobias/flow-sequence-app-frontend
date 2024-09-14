import { Step } from './step.model';

export interface LongBreakData {
  name: string;
  type: string;
  position: number;
  complete: boolean;
  duration: number;
}

export class LongBreak extends Step {
  constructor(data?: LongBreakData) {
    super(data);
    this.name = data?.name || 'Long Break';
    this.type = data?.type || 'longBreak';
  }
}
