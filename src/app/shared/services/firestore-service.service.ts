import { inject, Injectable } from '@angular/core';
import {
  collection,
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

  async saveSettings(uid: string, settings: {}) {
    if (uid) {
      const docRef = this.getDocRef('AppSettings', uid);

      await setDoc(docRef, settings);
      console.log('saved');
    }
  }

  async getSettings(uid: string) {
    const docRef = this.getDocRef('AppSettings', uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.log('No Settings Found');
      return null;
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
