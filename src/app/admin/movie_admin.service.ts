import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Movie } from './movie.model';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class MovieService {
  moviesChanged = new Subject<Movie[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private movies: Movie[] = [];

  constructor(private http: HttpClient) {}

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
    console.log(movies);
  }

  getMovies() {
    return this.movies.slice();
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
  }

  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies.slice());
  }

  deleteMovie(index: number) {
    var movieId=this.movies[index].id;
    // console.log("movie Id"+movieId)

    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());

    return this.http
    .delete<any>(
      'https://localhost:44355/api/Events/'+movieId,
    )
    
    // this.dataStorage.deleteMovies(movieId);
    
    
  }

  getMovieId(id:number)
  {
    var movieId= this.movies[id].id;
    // console.log(movie);
    return movieId;
  }
}
