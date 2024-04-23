import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { collection } from 'firebase/firestore';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  // movieList: Movie[] = new Array<Movie>
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadMoviesData()
  }

  // loadMovies() {
  //   this.movieService.getData().subscribe((snapshot) => {
  //     this.movieList = snapshot.map((changes) => {
  //       return {
  //         id: changes.payload.doc.id,
  //         ...changes.payload.doc.data()
  //       }
  //     })
  //   })
  // }
  loadMoviesData(): void {
    this.movieService.getData().subscribe((data: any[]) => {
      this.movies = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  redirectToSingleMovie(movieName: string) {
    this.router.navigate(['single-movie/', movieName])
    // this.movieService.getSingleMovie(movieName);
    // console.log(movieName)
  }
  
}
