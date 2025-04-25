import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsServiceService } from '../../services/settings-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-account-overlay.component.html',
  styleUrl: './delete-account-overlay.component.scss',
})
export class DeleteAccountOverlayComponent {
  private authService = inject(AuthService);
  private settingsService = inject(SettingsServiceService);
  private router = inject(Router);

  public startAnimation: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.startAnimation = true;
    }, 1);
  }

  async deleteAccount() {
    await this.settingsService.deleteSettings();
    await this.authService.deleteGoogleAccount();
    this.settingsService.settingsOpen = false;
    this.router.navigateByUrl('/login');
  }

  closeConfirmDelete() {
    this.startAnimation = false;
    setTimeout(() => {
      this.settingsService.confirmDeleteAccountOpen = false;
    }, 250);
  }
}
