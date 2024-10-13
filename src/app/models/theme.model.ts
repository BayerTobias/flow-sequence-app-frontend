export interface ThemeData {
  name: string;
  accentColor: string;
  gradientColor: string;
  backgroundImage: string;
}

export class Theme {
  name: string;
  accentColor: string;
  gradientColor: string;
  backgroundImage: string;

  constructor(data?: ThemeData) {
    this.name = data?.name || '';
    this.accentColor = data?.accentColor || '';
    this.gradientColor = data?.gradientColor || '';
    this.backgroundImage = data?.backgroundImage || '';
  }

  asJson() {
    return {
      name: this.name,
      accentColor: this.accentColor,
      gradientColor: this.gradientColor,
      backgroundImage: this.backgroundImage,
    };
  }
}
