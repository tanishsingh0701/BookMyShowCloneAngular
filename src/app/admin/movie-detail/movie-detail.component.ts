import { Component, Injectable, OnInit } from '@angular/core';
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
  userType:string;
  totalSingleEarning:number;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService
              ) {

                

              //   this.route.params
              //           .subscribe(
              //           (params: Params) => {
              //            item_id = +params['id'];
              //           this.movie = this.movieService.getMovie(this.item_id);
          
              //     }
              // );

                //this.totalSingleEarning=this.movieService.movieBookGetSingleEarning(this.movie[item_id].id);
               
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.movie = this.movieService.getMovie(this.id);
          // this.movie_id=this.movie.id;
          this.getSinleEarning();

          window.scrollTo(0, 0);
          
        }
      );
      this.userType=this.movieService.getUserType();

      console.log("user Type: "+this.userType);

     
            
          
   
      // this.movieService.movieBookGetSingleEarning(this.movieService.getMovieId(this.id)).subscribe(res => 
      //   {
      //     this.totalSingleEarning=res;
      //   });

  }

  // onAddToShoppingList() {
  //   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  // }

  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    window.scrollTo(0, 0);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  getSinleEarning()
  {
    this.movieService.movieBookGetSingleEarning(this.id).subscribe
            (res2 =>
              {
                this.totalSingleEarning=res2;
              });
  }


  onBookMovie()
  {
    this.router.navigate(['book'], {relativeTo: this.route});
    window.scrollTo(0, 0);

  }


  onDeleteMovie() {
    // this.movieService.deleteMovie(this.id);
    // this.dataStorageService.deleteMovies(this.id)

    // console.log("index is "+this.id);

    // this.movie_id=this.movieService.getMovieId(this.id);
    // this.dataStorageService.deleteMovies(this.movie_id)
    this.movieService.deleteMovie(this.id).subscribe();
    this.router.navigate(['/movie']);
    window.scrollTo(0, 0);
  }

}
