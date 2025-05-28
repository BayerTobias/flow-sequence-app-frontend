import { inject, Injectable, signal } from '@angular/core';

import {
  Auth,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { reauthenticateWithPopup } from 'firebase/auth';

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

  /**
   * Initiates the Google sign-in process using a popup.
   * On success, sets the signed-in user in the user signal.
   */
  async loginWithGoogle() {
    try {
      const result: UserCredential = await signInWithPopup(
        this.auth,
        this.provider
      );
      const user = result.user;
      this.userSignal.set(result.user);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Signs the user out and navigates to the login page.
   */
  async logout() {
    try {
      await this.auth.signOut();
      this.userSignal.set(null);
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error('Logout Error:', err);
    }
  }

  /**
   * Reauthenticates the user and deletes the Google account.
   */
  async deleteGoogleAccount() {
    try {
      const user = this.userSignal();

      if (!user) {
        console.error('No User logged in ');
        return;
      }

      await reauthenticateWithPopup(user, this.provider);
      await deleteUser(user);

      this.userSignal.set(null);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Initializes a listener to track authentication state changes.
   * Navigates to the welcome page if user logs in on the login page.
   */
  private initializeAuthStateListener() {
    onAuthStateChanged(this.auth, async (user) => {
      this.userSignal.set(user);
      if (user) {
        if (this.router.url === '/login') {
          this.router.navigate(['/welcome']);
        }
      }
    });
  }
}
