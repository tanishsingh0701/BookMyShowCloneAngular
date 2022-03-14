import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Movie } from './movie.model';
import { DataStorageService } from '../shared/data-storage.service';
import { MovieService } from './movie_admin.service';

@Injectable({ providedIn: 'root' })
export class MoviesResolverService implements Resolve<Movie[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private moviesService: MovieService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const movies = this.moviesService.getMovies();

    if (movies.length === 0) {
      return this.dataStorageService.fetchMovies();
    } else {
      return movies;
    }
  }
}
