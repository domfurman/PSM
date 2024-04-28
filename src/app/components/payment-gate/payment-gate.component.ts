import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviePaymentDetails } from '../../models/movie-payment-details';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-payment-gate',
  templateUrl: './payment-gate.component.html',
  styleUrl: './payment-gate.component.scss'
})
export class PaymentGateComponent implements OnInit{

  moviePaymentDetails: any = new MoviePaymentDetails();
  credentials: string = '';

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.getMovieParams();
    this.getCurUser()
  }

  getMovieParams() {
    this.route.queryParams.subscribe(queryParams => {
      const identifier = queryParams['identifier'];
      const price = queryParams['price'];
      const movie = queryParams['name'];

      this.moviePaymentDetails['movieName'] = movie;
      this.moviePaymentDetails['chosenPrice'] = price;
      this.moviePaymentDetails['identifier'] = identifier;
      // console.log(this.moviePaymentDetails)
  })
    
  }

  getCurUser() {
    this.authService.matchUser().subscribe(credentials => {
      this.credentials = credentials;
      console.log(credentials);
    });
  }

  pay() {
    Swal.fire({
      title: 'Payment succesfull',
      text: "Movie will appear in your library",
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
          this.redirectToLibrary()
      }
    });
  }

  redirectToLibrary() {
    this.router.navigate(['/library']);
  }
}
