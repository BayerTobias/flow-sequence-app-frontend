import { Component, inject } from '@angular/core';
import { SettingsServiceService } from '../../services/settings-service.service';
import { CommonModule } from '@angular/common';

import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { SettingsOverlayComponent } from '../../../settings/components/settings-overlay/settings-overlay.component';
import { PreviewOverlayComponent } from '../preview-overlay/preview-overlay.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 250,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
  imports: [
    PreviewOverlayComponent,
    SettingsOverlayComponent,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public focusModeOnIcon: boolean = false;
  public focusModeOffIcon: boolean = true;
  public switching: boolean = false;
  public fadeInStrat: boolean = false;
  public fadeInFinished: boolean = true;
  public showMenu: boolean = false;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.activatedRoute.snapshot.url.join('/');

        if (path === 'flowsequencetimer' || path === 'welcome') {
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }
      });
  }

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
