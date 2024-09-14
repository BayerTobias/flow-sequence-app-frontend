import { Step } from './step.model';

export class FlowSequence {
  steps: Step[];

  constructor() {
    this.steps = [];
  }

  addStep(step: Step) {
    this.steps.push(step);
  }

  sortSteps() {
    this.steps.sort((a, b) => a.position - b.position);
  }
}