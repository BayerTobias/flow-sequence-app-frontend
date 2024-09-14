import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, TimerComponent, MediaControlsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  timer: boolean = true;
}
