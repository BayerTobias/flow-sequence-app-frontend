import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private provider = new GoogleAuthProvider();

  constructor(private auth: Auth) {}

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;

      console.log(result);

      // if (this.userIsInDatabase(user)) {
      //   console.log('login successful:', user);
      // } else {
      //   this.createNewGoogleUser(user);
      // }
    } catch (err) {
      console.error(err);
    }
  }
}
