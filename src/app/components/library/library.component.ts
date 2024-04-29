import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{

  movies: string[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.matchMoviesWithUser().subscribe({
      next: movies => {
        this.movies = movies;
        console.log('Movies:', this.movies);
      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }

  // getmovies() {
  //   return this.movieService.matchMoviesWithUser().subscribe({
  //     next: movies => {
  //       this.movies = movies;
  //       console.log('Movies:', this.movies);
  //     },
  //     error: err => {
  //       console.error('Error:', err);
  //     }
  //   });
  // }
}
