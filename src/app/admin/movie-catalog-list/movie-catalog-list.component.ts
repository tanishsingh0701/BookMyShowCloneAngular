import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { MovieService } from '../movie_admin.service';

@Component({
  selector: 'app-movie-catalog-list',
  templateUrl: './movie-catalog-list.component.html',
  styleUrls: ['./movie-catalog-list.component.css']
})
export class MovieCatalogListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  subscription: Subscription;
  userType:string;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.movieService.moviesChanged
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );
    this.movies = this.movieService.getMovies();
    this.userType=this.movieService.getUserType();
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
