import { Step } from './step.model';

export interface flowSequenceData {
  name: string;
  description: string;
}

export class FlowSequence {
  name: string = '';
  description: string = '';
  steps: Step[];

  constructor(data?: flowSequenceData) {
    this.steps = [];
    this.name = data?.name || '';
    this.description = data?.description || '';
  }

  addStep(step: Step) {
    this.steps.push(step);
  }

  sortSteps() {
    this.steps.sort((a, b) => a.position - b.position);
  }
}
