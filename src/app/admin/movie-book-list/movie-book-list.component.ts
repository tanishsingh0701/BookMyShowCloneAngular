import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Movie } from '../movie.model';
import { MovieService } from '../movie_admin.service';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-movie-book-list',
  templateUrl: './movie-book-list.component.html',
  styleUrls: ['./movie-book-list.component.css']
})
export class MovieBookListComponent implements OnInit, OnDestroy {
  reservation: Reservation[];
  subscription: Subscription;
  userType:string;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorage:DataStorageService,
              private authService:AuthService
              ) {
                
  }

  ngOnInit() {
    this.subscription = this.movieService.movieBookTriggered
      .subscribe(res =>
        {
          if(res == "changed")
          {
            // console.log("Triggered");
            this.dataStorage.fetchReservation().subscribe();
            this.reservation = this.movieService.getReservation();
            this.movieService.getBookMovie();
          }

        }
      );

      this.authService.loginSuccess.subscribe(res => 
        {
          this.dataStorage.fetchReservation().subscribe();
            this.reservation = this.movieService.getReservation();
            this.movieService.getBookMovie();
        });
      

     
    //this.reservation = this.movieService.getReservation();
    this.userType=this.movieService.getUserType();
    this.dataStorage.fetchReservation().subscribe();
    this.reservation = this.movieService.getReservation();
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
