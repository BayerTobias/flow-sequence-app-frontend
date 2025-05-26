import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../services/settings-service.service';
import { Router } from '@angular/router';
import { SimpleSettingsButtonComponent } from '../buttons/simple-settings-button/simple-settings-button.component';

@Component({
  selector: 'app-delete-account-overlay',
  standalone: true,
  imports: [CommonModule, SimpleSettingsButtonComponent],
  templateUrl: './delete-account-overlay.component.html',
  styleUrl: './delete-account-overlay.component.scss',
})
export class DeleteAccountOverlayComponent {
  private authService = inject(AuthService);
  private settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public startAnimation: boolean = false;

  /**
   * Starts the entrance animation after the view is initialized.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.startAnimation = true;
    }, 1);
  }

  /**
   * Deletes the user account and navigates to the login page.
   */
  async deleteAccount() {
    await this.settingsService.deleteSettings();
    await this.authService.deleteGoogleAccount();
    this.settingsService.settingsOpen = false;
    this.router.navigateByUrl('/login');
  }

  /**
   * Closes the delete account confirmation overlay with an exit animation.
   */
  closeConfirmDelete() {
    this.startAnimation = false;
    setTimeout(() => {
      this.settingsService.confirmDeleteAccountOpen = false;
    }, 250);
  }
}
