import { Step } from './step.model';

export interface FlowTimeData {
  name: string;
  type: string;
  position: number;
  complete: boolean;
  duration: number;
}

export class FlowTime extends Step {
  constructor(data?: FlowTimeData) {
    super(data);
    this.type = data?.type || 'flowTime';
  }
}
