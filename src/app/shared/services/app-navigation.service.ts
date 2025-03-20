import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService {
  public scrollToLogin = signal<boolean>(false);

  constructor() {}

  triggerScroll() {
    this.scrollToLogin.set(true);
    setTimeout(() => {
      this.scrollToLogin.set(false);
    }, 100);
  }
}
