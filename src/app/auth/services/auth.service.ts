import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = environment.googleCientId;
  private authInstance: any;

  constructor() {
    this.loadGoogleAuth();
  }

  private loadGoogleAuth(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log(this.clientId);

      const google = (window as any).google;
      if (google) {
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse.bind(this),
        });
        console.log(google);

        this.authInstance = google;
        console.log('Google Auth initialized');
      } else {
        console.error('Google library not available');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Auth script');
    };

    document.head.appendChild(script);
  }

  public signIn(): void {
    if (this.authInstance) {
      this.authInstance.accounts.id.prompt();
    } else {
      console.error('Google Auth instance not initialized');
    }
  }

  private handleCredentialResponse(response: any): void {
    const token = response.credential;
    console.log('Google Token:', token);
  }
}
