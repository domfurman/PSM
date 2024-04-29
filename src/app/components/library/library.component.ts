import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{

  movies: string[] = [];

  mail: string = '';
  credentials: string = '';
  userSubscription!: Subscription;
  loading: boolean = false;

  constructor(private authService: AuthService, private movieService: MovieService) {
  }

  async ngOnInit(): Promise<void> {
    // this.getCurUser();
    // console.log(this.authService.isUserSignedIn())
    await this.userAuthCheck()
    this.getmovies();
    this.matchUser();
  }

  async userAuthCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.userSubscription = this.authService.user$.subscribe((user: { email: string; }) => {
        if (user) {
          this.mail = user.email;
        } else {
          this.mail = '';
        }
        resolve(); // Resolve the Promise when userAuthCheck is completed
      });
    });
  }

  getmovies(): void {
    this.movieService.matchMoviesWithUser(this.mail).subscribe({
      next: movies => {
        this.movies = movies;
        this.loading = false;
        console.log('Movies:', this.movies);
      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }

  matchUser() {
    this.authService.matchUserWithEmail(this.mail).subscribe(credentials => {
      const words = credentials.trim().split(/\s+/);
      const firstWord = words.length > 0 ? words[0] : '';   
      this.credentials = firstWord;
  })
  }

  // userAuthCheck() {
  //   this.userSubscription = this.authService.user$.subscribe((user: { email: string; }) => {
  //     if (user) {
  //       // User is signed in
  //       // console.log(user)
  //       this.credentials = user.email; // For example, assuming email is stored in user object
  //       console.log(this.credentials)
  //       return user.email
  //     } else {
  //       // User is not signed in
  //       this.credentials = ''; // Clear credentials if user is not signed in
  //       return ''
  //     }
  //   });
  // }

  // getmovies() {
  //   this.userAuthCheck()
  //   console.log(this.credentials)
  //   return this.movieService.matchMoviesWithUser(this.credentials).subscribe({
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
