import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Movie } from '../movie.model';
import { MovieService } from '../movie_admin.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  movies2:Movie[];
  searchTerm:string;
  subscription: Subscription;
  userType:string;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              ) {
                // this.movieService.moviesChanged.subscribe(res =>
                //   {
                //     this.movies=res;
                //   });
                // this.movies2=this.movies;
  }

  ngOnInit() {
    this.movies2=this.movies;
    this.subscription = this.movieService.moviesChanged
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );

      
      // this.movieService.moviesChanged.subscribe(res =>
      //   {
      //     this.movies=res;
      //   });

      

      this.movieService.searchTriggered.subscribe(res => 
        {

          if(!res)
          {
            this.movieService.getSearchableMovies("1").subscribe();

          }
          else{
          this.searchTerm=res;
          this.movieService.getSearchableMovies(this.searchTerm).subscribe();

          // this.movies2=this.movies.filter(val => val.name.toLowerCase().includes(this.searchTerm));
        }
        });

      
    this.movies = this.movieService.getMovies();
    this.userType=this.movieService.getUserType();
    // this.movieService.movieBookTriggered.subscribe(res =>
    //   {
    //     if(res === 'changed')
    //     {
    //       this.movies = this.movieService.getMovies();

    //     }
        

    //   });
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
