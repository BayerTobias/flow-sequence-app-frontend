import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { SettingsServiceService } from '../../services/settings-service.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public legalAndLogin: boolean = true;

  public settingsService = inject(SettingsServiceService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.activatedRoute.snapshot.url.join('/');

        if (path === 'flowsequencetimer' || path === 'welcome') {
          this.legalAndLogin = false;
        } else {
          this.legalAndLogin = true;
        }
      });
  }
}
