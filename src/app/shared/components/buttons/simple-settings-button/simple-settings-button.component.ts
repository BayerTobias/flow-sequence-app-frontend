import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-settings-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-settings-button.component.html',
  styleUrl: './simple-settings-button.component.scss',
})
export class SimpleSettingsButtonComponent {
  @Input() content: string = '';
  @Input() width: number | null = null;
  @Input() height: number | null = null;

  @Output() submitEvent = new EventEmitter<void>();

  submit() {
    this.submitEvent.emit();
  }
}
