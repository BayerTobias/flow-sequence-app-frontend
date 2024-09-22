import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsServiceService {
  public settingsOpen: boolean = false;

  constructor() {}
}
