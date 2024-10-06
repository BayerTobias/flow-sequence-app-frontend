import { FlowTime } from './flow-time.model';
import { LongBreak } from './long-break.model';
import { ShortBreak } from './short-break.model';
import { Step, StepData } from './step.model';

export interface flowSequenceData {
  name: string;
  description: string;
  steps?: Step[];
}

export class FlowSequence {
  name: string = '';
  description: string = '';
  steps: Step[];

  constructor(data?: flowSequenceData) {
    this.steps = data?.steps || [];
    this.name = data?.name || '';
    this.description = data?.description || '';

    if (data?.steps) {
      this.steps = this.resolveSteps(data.steps);
    }
  }

  addStep(step: Step) {
    this.steps.push(step);
  }

  sortSteps() {
    this.steps.sort((a, b) => a.position - b.position);
  }

  resolveSteps(stepsData: StepData[]) {
    return stepsData
      .map((stepData) => {
        switch (stepData.type) {
          case 'flowTime':
            return new FlowTime(stepData);
          case 'shortBreak':
            return new ShortBreak(stepData);
          case 'longBreak':
            return new LongBreak(stepData);
          default:
            console.error('Unknown step Type');
            return null;
        }
      })
      .filter((step) => step !== null);
  }

  asJson() {
    return {
      name: this.name,
      description: this.description,
      steps: this.steps.map((step) => step.asJson()),
    };
  }
}
