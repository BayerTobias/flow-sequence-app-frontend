import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreServiceService {
  private firestore = inject(Firestore);

  constructor() {}

  /**
   * Checks if the given user ID corresponds to a first-time login.
   * This is determined by whether settings already exist for the user in Firestore.
   *
   * @param uid - The user's unique ID.
   * @returns A promise resolving to true if no settings are found (i.e., first login), false otherwise.
   */
  async isFirstLogin(uid: string): Promise<boolean> {
    const docRef = this.getDocRef('AppSettings', uid);
    const docSnapshot = await getDoc(docRef);

    return !docSnapshot.exists();
  }

  /**
   * Saves the user settings to Firestore under the specified user ID.
   *
   * @param uid - The user's unique ID.
   * @param settings - An object containing the settings to be stored.
   */
  async saveSettings(uid: string, settings: {}) {
    if (uid) {
      const docRef = this.getDocRef('AppSettings', uid);

      await setDoc(docRef, settings);
    }
  }

  /**
   * Retrieves the settings document for a specific user.
   *
   * @param uid - The user's unique ID.
   * @returns The settings object if found, or null otherwise.
   */
  async getSettings(uid: string) {
    const docRef = this.getDocRef('AppSettings', uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  }

  /**
   * Deletes the settings document associated with the given user ID.
   *
   * @param uid - The user's unique ID.
   */
  async deleteSettings(uid: string) {
    try {
      const docRef = this.getDocRef('AppSettings', uid);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Retrieves a reference to a Firestore collection with the specified name.
   * @param colName - The name of the collection.
   * @returns A reference to the Firestore collection.
   */
  getColRef(colName: string) {
    return collection(this.firestore, colName);
  }

  /**
   * Retrieves a reference to a Firestore document with the specified ID within the given collection.
   * @param colName - The name of the collection containing the document.
   * @param docId - The ID of the document to retrieve.
   * @returns A reference to the Firestore document.
   */
  getDocRef(colName: string, docId: string) {
    return doc(this.getColRef(colName), docId);
  }
}
