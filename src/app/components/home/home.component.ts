import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { collection } from 'firebase/firestore';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  movies: any[] = [];
  users: any[] = [];

  activeUser = '';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMoviesData();
  }

  loadMoviesData(): void {
    this.movieService.getData().subscribe((data: any[]) => {
      this.movies = data.map((item) => {
        this.loading = false;
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        };
      });
    });
  }

  redirectToSingleMovie(movieName: string) {
    if (this.checkIfUserIsSignedIn()) {
      console.log(this.checkIfUserIsSignedIn);
      this.router.navigate(['single-movie/', movieName]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkIfUserIsSignedIn() {
    return this.authService.isUserSignedIn();
  }

  // getCurUser() {
  //   this.authService.matchUser().subscribe(credentials => {
  //     this.activeUser = credentials;
  //     console.log(credentials);
  //   });
  // }

  // getActiveUser() {
  //   return this.activeUser;
  // }
}
