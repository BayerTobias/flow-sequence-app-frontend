import { inject, Injectable } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { authConfig } from '../auth.config';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private oAuthService = inject(OAuthService);

  constructor() {
    this.configure();
  }

  configure() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initLoginFlow();
    // this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  get accessToken() {
    return this.oAuthService.getAccessToken();
  }

  async getUserInfo() {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const resp = this.http.get(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    console.log(lastValueFrom(resp));
  }
}
