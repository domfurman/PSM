import { Injectable, inject } from '@angular/core';
import { Firestore, doc, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaxValidator } from '@angular/forms';
import { Movie } from '../models/movie';
import { docData } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { take } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // firestore: Firestore = inject(Firestore);

  constructor(private fbs: AngularFirestore) { }

  getData() {
    return this.fbs
   .collection("movies")
   .snapshotChanges();
}


// getSingleMovie(movieName: string) {
//   return this.fbs
//  .collection("movies")
//  .doc(movieName)
//  .valueChanges();

// }
// getSingleMovie(movieName: string) {
//   // return this.fbs.collection("movies").doc(movieName).valueChanges();
//   // const cityRef = this.fbs.collection('movies').doc(movieName);
//   // const doc = cityRef.get();
//   // if (!doc) {
//   //   console.log('No such document!');
//   // } else {
//   //   console.log('Document data:', doc.subscribe(data => {
//   //     console.log(data)
//   //   }));
//   // }
//   console.log(this.fbs.collection('movies').doc('Mroczny Rycerz').get());

// }
// async getSingleMovie(movieName: string) {
//   try {
//     const docRef = this.fbs.collection('movies').doc(movieName);
//     const docSnapshot = await docRef.get();

//     if (!docSnapshot.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', docSnapshot.data());
//     }
//   } catch (error) {
//     console.error('Error getting document:', error);
//   }
async getSingleMovie(movieName: string) {
  try {
    const docRef = this.fbs.collection('movies').doc(movieName);
    const docSnapshot = await docRef.get().pipe(take(1)).toPromise();

    if (!docSnapshot || !docSnapshot.exists) {
      // console.log('No such document!');
      return null
    } else {
      // console.log('Document data:', docSnapshot.data());
      return docSnapshot.data();
    }
  } catch (error) {
    // console.error('Error getting document:', error);
    return null;
  }
  // const docRef = this.fbs.collection('movies').doc(movieName);
  // const docSnapshot = await docRef.get().pipe(take(1)).toPromise();
  // return docSnapshot?.data()
}
}

// mapToMovieClass(data: any): Movie {
//   const movie = new Movie();
//   movie.id = data.id;
//   movie.description = data.description;
//   movie.director = data.director;
//   movie.duration = data.duration;
//   movie.linkToImage = data.linkToImage;
//   movie.movieName = data.movieName;
//   movie.price = data.price;
//   // Add additional properties as needed
//   return movie;
// }
