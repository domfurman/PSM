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

  movie: any = new Movie();

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMovie()
  }


  getMovie() {
    this.route.params.subscribe(async params => {
      const movieName = params['movieName'];
      try {
        const movieData = await this.movieService.getSingleMovie(movieName);
        this.movie = movieData
        
      } catch (error) {
        console.error('Error getting movie:', error);
      }
      
    })

  }
}
