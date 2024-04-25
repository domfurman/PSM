import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.scss'
})
export class SingleMovieComponent implements OnInit{

  movie: any = new Movie();
  boughtFor24h: boolean = false

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {}

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

  redirectToPaymentGate(identifier: string, m: string, p: number) {
    this.router.navigate(['/payment-gate', m], {queryParams: {identifier: identifier, price: p, name: m}})
  }
}
