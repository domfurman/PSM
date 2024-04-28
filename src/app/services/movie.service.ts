import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  loading: boolean = true;
  constructor(private fbs: AngularFirestore) {}

  getData() {
    return this.fbs.collection('movies').snapshotChanges();
  }

  async getSingleMovie(movieName: string) {
    try {
      const docRef = this.fbs.collection('movies').doc(movieName);
      const docSnapshot = await docRef.get().pipe(take(1)).toPromise();

      if (!docSnapshot || !docSnapshot.exists) {
        // console.log('No such document!');
        return null;
      } else {
        this.loading = false; 
        return docSnapshot.data();
      }
    } catch (error) {
      // console.error('Error getting document:', error);
      return null;
    }
  }
}

