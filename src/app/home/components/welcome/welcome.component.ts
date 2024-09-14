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
  test() {
    console.log('test');
  }
}
