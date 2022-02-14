import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Movie } from '../admin/movie.model';
import { MovieService } from '../admin/movie_admin.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  // storeMovies() {
  //   const movies = this.movieService.getMovies();
  //   this.http
  //     .put(
  //       'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
  //       movies
  //     )
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  fetchMovies() {
    return this.http
      .get<Movie[]>(
        'https://localhost:44355/api/Events/getAllEvents',
      )
      .pipe(
        map(movies => {
          return movies.map(movie => {
            return {
              ...movie,
              // ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(movies => {
          this.movieService.setMovies(movies);
        })
      );
  }

  // deleteMovies(id:number)
  // {
  //   return this.http
  //   .delete<any>(
  //     'https://localhost:44355/api/Events/'+id,
  //   )

  // }
}
