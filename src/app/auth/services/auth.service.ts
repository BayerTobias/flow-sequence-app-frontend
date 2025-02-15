import { inject, Injectable, signal } from '@angular/core';

import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SettingsServiceService } from '../../shared/services/settings-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  private provider = new GoogleAuthProvider();

  public userSignal = signal<User | null>(null);

  constructor() {
    this.initializeAuthStateListener();
  }

  async loginWithGoogle() {
    try {
      const result: UserCredential = await signInWithPopup(
        this.auth,
        this.provider
      );

      this.userSignal.set(result.user);
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.userSignal.set(null);
      this.router.navigateByUrl('/login');

      console.log('Erfolgreich ausgeloggt');
    } catch (err) {
      console.error('Logout fehlgeschlagen:', err);
    }
  }

  private initializeAuthStateListener() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSignal.set(user);
      if (user) {
        console.log('Benutzer eingeloggt:', user.uid);

        if (this.router.url === '/login') {
          this.router.navigate(['/welcome']);
        }
      } else {
        console.log('Kein Benutzer eingeloggt.');
      }
    });
  }
}
