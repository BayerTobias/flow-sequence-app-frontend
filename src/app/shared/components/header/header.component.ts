import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../services/settings-service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public settingsService = inject(SettingsServiceService);
  private authService = inject(AuthService);
  public focusModeOnIcon: boolean = false;
  public focusModeOffIcon: boolean = true;
  public switching: boolean = false;
  public fadeInStrat: boolean = false;
  public fadeInFinished: boolean = true;

  ngOnInit() {
    const FocusMode = this.settingsService.appSettings.focusMode;

    if (FocusMode) {
      this.focusModeOnIcon = true;
      this.focusModeOffIcon = false;
    } else {
      this.focusModeOnIcon = false;
      this.focusModeOffIcon = true;
    }
  }

  openSettings() {
    this.settingsService.settingsOpen = true;
  }

  openUserMenu() {
    console.log('Open user Menu');
  }

  toggleFocusMode() {
    this.switching = true;
    this.settingsService.toggleFocusMode();

    setTimeout(() => {
      this.toggleIcons();
      this.switching = false;
      this.fadeInStrat = true;
      this.fadeInFinished = false;

      setTimeout(() => {
        this.fadeInStrat = false;
        this.fadeInFinished = true;
      }, 10);
    }, 200);
  }

  toggleIcons() {
    this.focusModeOffIcon = !this.focusModeOffIcon;
    this.focusModeOnIcon = !this.focusModeOnIcon;
  }
}
