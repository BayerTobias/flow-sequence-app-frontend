export interface StepData {
  name: string;
  type: string;
  position: number;
  complete: boolean;
  duration: number;
}

export class Step {
  name: string;
  type: string;
  position: number;
  complete: boolean;
  duration: number;

  constructor(data?: StepData) {
    this.name = data?.name || '';
    this.type = data?.type || '';
    this.position = data?.position || -1;
    this.complete = data?.complete || false;
    this.duration = data?.duration || 0;
  }

  asJson() {
    return {
      name: this.name,
      type: this.type,
      position: this.position,
      complete: this.complete,
      duration: this.duration,
    };
  }
}
