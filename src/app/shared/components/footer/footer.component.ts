import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsServiceService } from '../../services/settings-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public settingsService = inject(SettingsServiceService);
}
