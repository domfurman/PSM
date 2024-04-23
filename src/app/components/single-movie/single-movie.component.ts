import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.scss'
})
export class SingleMovieComponent implements OnInit{

  movie: Movie = new Movie();

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMovie()
  }


  getMovie() {
    this.route.params.subscribe(params => {
      const movieName = params['movieName'];
    this.movieService.getSingleMovie(movieName).subscribe((data: any) => {
        const movie = this.movieService.mapToMovieClass(data);
        console.log(movie); // Do something with the mapped movie object
    });})
}
  

  // getMovie() {
  //   // this.movieService.getSingleMovie()
  //   this.route.params.subscribe(params => {
  //     const movieName = params['movieName'];
  //     console.log(movieName);
  //     this.movieService.getSingleMovie(movieName).subscribe((data: any) => {
  //       console.log(data);
  //       if (data.payload.exists) {
  //           const movieData = data.payload.data();
            
  //           // Create a new instance of the Movie class and populate it with data
  //           this.movie = new Movie();
  //           this.movie.id = data.payload.id;
  //           this.movie.description = movieData.description;
  //           this.movie.director = movieData.director;
  //           this.movie.duration = movieData.duration;
  //           this.movie.linkToImage = movieData.linkToImage;
  //           this.movie.movieName = movieData.movieName;
  //           this.movie.price = movieData.price;
  //           this.movie.key = movieData.key; // Assuming 'key' is a property of your Movie class
  //           console.log(this.movie)
            
  //           // Optionally, you can handle other properties if needed
  //       } else {
  //           console.error('Document does not exist or is empty:', data);
  //           // Handle the error or empty data case appropriately
  //       }
  //   }
      
  //   )})}
}
