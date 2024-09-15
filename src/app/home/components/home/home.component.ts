import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TimerComponent } from '../timer/timer.component';
import { MediaControlsComponent } from '../media-controls/media-controls.component';
import { FlowSequenceDetailsComponent } from '../flow-sequence-details/flow-sequence-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WelcomeComponent,
    TimerComponent,
    MediaControlsComponent,
    FlowSequenceDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  timer: boolean = true;
}
