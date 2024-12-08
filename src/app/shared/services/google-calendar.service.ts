import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private url = 'https://www.googleapis.com/calendar/v3';

  constructor() {}

  async testGetEvents() {
    const accessToken = this.authService.accessToken;

    if (!accessToken) {
      console.error('No Access Token');
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const resp = await lastValueFrom(
        this.http.get(`${this.url}/calendar/primary/events`, { headers })
      );
      console.log(resp);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }
}
