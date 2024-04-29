import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  loading: boolean = true;
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  getData() {
    return this.firestore.collection('movies').snapshotChanges();
  }

  async getSingleMovie(movieName: string) {
    try {
      const docRef = this.firestore.collection('movies').doc(movieName);
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

  // addMovieToLibrary(userEmail: string, movieName: string) {
  //   // try {
  //   //   const docRef = this.firestore.collection('library').doc(userEmail).set({
  //   //     movieName: movieName
  //   //   });
  //   //   console.log('Document created with ID: ', userEmail)
  //   // } catch (error) {
  //   //   console.error("Error creating document:", error);
  //   // }
    
  // }

  addMovieToLibrary(userEmail: string, movieName: string): Observable<void> {
    const docRef = this.firestore.collection('library').doc(userEmail);

    return from(docRef.get().toPromise().then(docSnapshot => {
      if (docSnapshot && docSnapshot.exists) {
        const movieNames = docSnapshot.get('movieNames') || [];
        movieNames.push(movieName);
        return docRef.update({ movieNames });
      } else {
        return docRef.set({ movieNames: [movieName] });
      }
    })).pipe(
      catchError(error => {
        console.error('Error adding movie to library:', error);
        throw error;
      })
    );
  }

  matchMoviesWithUser(email: string): Observable<string[]> {
    return new Observable<string[]>(observer => {

      // // checks if user is signed in
      // const auth = getAuth();
      // const curUser = auth.currentUser;
      // if (!curUser) {
      //   console.log('1')
      //   observer.next([]);
      //   observer.complete(); // Complete the observer
      //   return;
      // }
      
      // // extracts user's email
      // const currentUserEmail = this.authService.getCurrentUserEmail();
      // if (!currentUserEmail) {
      //   observer.next([]);
      //   observer.complete(); // Complete the observer
      //   return; 
      // }

      this.firestore.collection("library").doc(email)
        .get().pipe(
          switchMap(querySnapshot => {
            if (!querySnapshot.exists) {
              // If the document doesn't exist, return an empty array
              return of([]);
            } else {
              const data = querySnapshot.data() as { movieNames?: string[] };
              if (data && Array.isArray(data.movieNames)) {
                // If movieNames field is an array, return it
                return of(data.movieNames);
              } else {
                // If movieNames field is not an array or doesn't exist, return an empty array
                return of([]);
              }
            }
          }),
          catchError(error => {
            console.error("Error getting user document:", error);
            // Handle error by returning an empty array
            return of([]);
          })
        )
        .subscribe({
          next: movies => {
            observer.next(movies);
            observer.complete(); // Complete the observer
          },
          error: err => {
            console.error("Error getting movies:", err);
            observer.error(err);
          }
        });
    });
  }
      
      
      // this.firestore.collection("library").doc(currentUserEmail)
      //   .get().toPromise()
      //   .then(querySnapshot => {
      //     if (!querySnapshot?.exists) {
      //       observer.next("");
          
      //     } else {
      //       const data = querySnapshot.data() as {movieName: string}
      //       const movie = data.movieName
      //       console.log(movie)
      //       observer.next(movie)
      //     }
      //   })
      //   // error handling
      //   .catch(error => {
      //     console.error("Error getting user document:", error);
      //     observer.next("");
      //   });
    // });
  }


