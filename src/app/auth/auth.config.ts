import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.redirectUrl,

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: environment.googleCientId,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email https://www.googleapis.com/auth/calendar.events',
  strictDiscoveryDocumentValidation: false, // Strikte Prüfung deaktivieren

  // responseType: 'code', // Code Flow verwenden
  // useSilentRefresh: true, // Silenter Login wird unterstützt
  // showDebugInformation: true, // Debug-Infos aktivieren
};
