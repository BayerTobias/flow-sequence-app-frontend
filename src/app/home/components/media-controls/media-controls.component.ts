import { Component } from '@angular/core';

@Component({
  selector: 'app-media-controls',
  standalone: true,
  imports: [],
  templateUrl: './media-controls.component.html',
  styleUrl: './media-controls.component.scss',
})
export class MediaControlsComponent {
  play() {
    console.log('play');
  }

  pause() {
    console.log('pause');
  }

  next() {
    console.log('next');
  }

  previous() {
    console.log('previous');
  }
}
