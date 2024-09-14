import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, TimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  timer: boolean = true;
}
