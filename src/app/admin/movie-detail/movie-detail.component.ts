import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Movie } from '../movie.model';
import { MovieService } from '../movie_admin.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  id: number;
  movie_id:number;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService
              ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.movie = this.movieService.getMovie(this.id);
          
        }
      );
  }

  // onAddToShoppingList() {
  //   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  // }

  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteMovie() {
    // this.movieService.deleteMovie(this.id);
    // this.dataStorageService.deleteMovies(this.id)

    // console.log("index is "+this.id);

    this.movie_id=this.movieService.getMovieId(this.id);
    // this.dataStorageService.deleteMovies(this.movie_id)
    this.movieService.deleteMovie(this.id);
    this.router.navigate(['/movie']);
  }

}
