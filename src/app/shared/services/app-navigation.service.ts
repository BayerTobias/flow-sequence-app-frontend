import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService {
  public scrollToLogin = signal<boolean>(false);

  constructor() {}

  /**
   * Triggers a temporary scroll event signal.
   * Sets the signal to true briefly so components can respond to it,
   * then resets it back to false after 100ms.
   */
  triggerScroll() {
    this.scrollToLogin.set(true);
    setTimeout(() => {
      this.scrollToLogin.set(false);
    }, 100);
  }
}
