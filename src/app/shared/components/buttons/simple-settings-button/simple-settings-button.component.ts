import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-settings-button',
  standalone: true,
  imports: [],
  templateUrl: './simple-settings-button.component.html',
  styleUrl: './simple-settings-button.component.scss',
})
export class SimpleSettingsButtonComponent {
  @Input() content: string = '';
  @Output() submitEvent = new EventEmitter<void>();

  submit() {
    this.submitEvent.emit();
  }
}
