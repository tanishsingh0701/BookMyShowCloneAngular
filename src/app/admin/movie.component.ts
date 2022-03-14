import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { MovieService } from './movie_admin.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MoviesComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;
  totalSingleEarning:number;
  totalEarning:number;
  user_type:string;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private movieService:MovieService
  ) {
  }

  
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });

    this.dataStorageService.fetchMovies().subscribe();
    this.movieService.movieBookGetTotalEarning().subscribe(res => 
      {
        this.totalEarning=res;
      });

  

    this.user_type=this.movieService.getUserType();
    // this.dataStorageService.fetchReservation().subscribe();
  }

}
