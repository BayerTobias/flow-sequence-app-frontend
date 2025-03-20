import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsServiceService } from '../../services/settings-service.service';

@Component({
  selector: 'app-login-info-base',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './login-info-base.component.html',
  styleUrl: './login-info-base.component.scss',
})
export class LoginInfoBaseComponent {
  public settingsService = inject(SettingsServiceService);
}
