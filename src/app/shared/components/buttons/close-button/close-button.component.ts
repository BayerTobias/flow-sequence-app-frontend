import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [],
  templateUrl: './close-button.component.html',
  styleUrl: './close-button.component.scss',
})
export class CloseButtonComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  /**
   * Emits an event when the button is clicked.
   */
  onButtonClick() {
    this.buttonClicked.emit();
  }
}
