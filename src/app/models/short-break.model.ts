import { Step } from './step.model';

export interface ShortBreakData {
  name: string;
  type: string;
  position: number;
  complete: boolean;
  duration: number;
}

export class ShortBreak extends Step {
  constructor(data?: ShortBreakData) {
    super(data);
    this.name = data?.name || 'Short Break';
    this.type = data?.type || 'shortBreak';
  }
}
