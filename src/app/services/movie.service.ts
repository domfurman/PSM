import { Injectable, inject } from '@angular/core';
import { Firestore, doc, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaxValidator } from '@angular/forms';
import { Movie } from '../models/movie';



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
getSingleMovie(movieName: string): Observable<any> {
  return this.fbs.collection("movies").doc(movieName).valueChanges();
}

mapToMovieClass(data: any): Movie {
  const movie = new Movie();
  movie.id = data.id;
  movie.description = data.description;
  movie.director = data.director;
  movie.duration = data.duration;
  movie.linkToImage = data.linkToImage;
  movie.movieName = data.movieName;
  movie.price = data.price;
  // Add additional properties as needed
  return movie;
}
}
