import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [],
  templateUrl: './glass-button.component.html',
  styleUrl: './glass-button.component.scss',
})
export class GlassButtonComponent {
  @Input() btnName: string = '';
  @Input() btnType: string = '';
  @Input() btnAction: string = '';

  @Output() buttonClicked = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
