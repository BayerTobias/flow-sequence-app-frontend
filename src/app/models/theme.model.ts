export interface ThemeData {
  name: string;
}

export class Theme {
  name: string;

  constructor(data?: ThemeData) {
    this.name = data?.name || '';
  }

  asJson() {
    return {
      name: this.name,
    };
  }
}
