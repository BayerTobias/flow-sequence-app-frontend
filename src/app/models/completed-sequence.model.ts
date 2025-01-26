export interface CompletedSequenceData {
  name: string;
  completed: string;
  duration: number;
}

export class CompletedSequence {
  name: string;
  completed: string;
  duration: number;

  constructor(data?: CompletedSequenceData) {
    this.name = data?.name || '';
    this.completed = data?.completed || '';
    this.duration = data?.duration || 0;
  }

  asJson() {
    return {
      name: this.name,
      completed: this.completed,
      duration: this.duration,
    };
  }
}
