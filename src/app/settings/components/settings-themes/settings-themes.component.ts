import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import { Theme } from '../../../models/theme.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-themes',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SimpleSettingsButtonComponent,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings-themes.component.html',
  styleUrl: './settings-themes.component.scss',
})
export class SettingsThemesComponent {
  public settingsService = inject(SettingsServiceService);
  public selectedTheme: Theme = this.settingsService.appSettings.theme;

  /**
   * Applies a new theme if it's different from the current one.
   */
  chooseTheme() {
    if (this.settingsService.appSettings.theme !== this.selectedTheme) {
      this.animateThemeChange();
      this.settingsService.appSettings.theme = this.selectedTheme;
      this.settingsService.saveSettings();
    } else {
      console.log('ist schon dummy');
    }
  }

  /**
   * Handles theme change animation by toggling internal flags.
   */
  animateThemeChange() {
    this.settingsService.oldTheme = this.settingsService.appSettings.theme;
    this.settingsService.themeTransitionInProgress = true;

    setTimeout(() => {
      this.settingsService.themeFade = true;
    }, 1);

    setTimeout(() => {
      this.settingsService.oldTheme = null;
      this.settingsService.themeFade = false;
      this.settingsService.themeTransitionInProgress = false;
    }, 650);
  }

  /**
   * Compares two themes for equality based on their name.
   */
  compareThemes(theme1: Theme, theme2: Theme): boolean {
    return theme1 && theme2 ? theme1.name === theme2.name : theme1 === theme2;
  }
}
