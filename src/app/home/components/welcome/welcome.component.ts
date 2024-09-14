import { Component } from '@angular/core';
import { GlassButtonComponent } from '../../../shared/components/buttons/glass-button/glass-button.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [GlassButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  startStandardTimer() {
    console.log('Standard Timer');
  }

  startStandardReverse() {
    console.log('Standard Reverse');
  }

  openCreateTimerMenu() {
    console.log('Create Timer');
  }

  openSavedTimersMenu() {
    console.log('Browse Timer');
  }
}
