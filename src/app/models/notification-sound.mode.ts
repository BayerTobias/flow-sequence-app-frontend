export interface NotificationSoundData {
  name: string;
  path: string;
}

export class NotificationSound {
  name: string;
  path: string;

  constructor(data?: NotificationSoundData) {
    this.name = data?.name || '';
    this.path = data?.path || '';
  }

  asJson() {
    return {
      name: this.name,
      path: this.path,
    };
  }
}
