import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings-button-with-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-button-with-icon.component.html',
  styleUrl: './settings-button-with-icon.component.scss',
})
export class SettingsButtonWithIconComponent {
  @Input() content: string = '';
  @Input() width: number | null = null;
  @Input() height: number | null = null;
  @Input() fontWeight: number | null = null;
  @Input() fontSize: number | null = null;
  @Input() imgPath: string | null = null;
  @Input() style: string = 'primary';

  @Output() submitEvent = new EventEmitter<void>();

  submit() {
    this.submitEvent.emit();
  }
}
