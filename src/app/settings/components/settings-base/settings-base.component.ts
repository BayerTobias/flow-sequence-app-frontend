import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SettingsGeneralComponent } from '../settings-general/settings-general.component';

@Component({
  selector: 'app-settings-base',
  standalone: true,
  imports: [CommonModule, SettingsGeneralComponent],
  templateUrl: './settings-base.component.html',
  styleUrl: './settings-base.component.scss',
})
export class SettingsBaseComponent {
  @Input() startAnimation: boolean = false;
  public activeTab: string = 'general';
}
