import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { MovieService } from '../movie_admin.service';
import { UserData } from '../userdata.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id: number;
  editMode = false;
  movieForm: FormGroup;
  // userData:UserData;
  

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    console.log(this.movieService.getUserType());
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // console.log("ID:-"+this.id);
      this.movieService.updateMovie(this.id, this.movieForm.value);
    } else {
      console.log("This is returned");
      console.log(this.movieForm.value);
      this.movieService.addMovie(this.movieForm.value);
    }
    this.onCancel();
  }

  // onAddIngredient() {
  //   (<FormArray>this.movieForm.get('ingredients')).push(
  //     new FormGroup({
  //       name: new FormControl(null, Validators.required),
  //       amount: new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.movieForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let movieName = '';
    let movieImagePath = '';
    let movieDescription = '';
    let movieImageUrl = '';
    let movieArtist = '';
    let movieGenre = '';
    let moviePrice :number;
    let movieTotalSeats :number;
    let movieTrailorUrl = '';
    let movieDuration = '';
    let movieLanguage = '';
    let movieCity = '';
    
    // let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const movieId=this.movieService.getMovieId(this.id);
      const movie = this.movieService.getMovie(this.id);
      console.log("This is move");
      console.log(movie);
      movieName = movie.name;
      movieImagePath = movie.image_url;
      movieDescription = movie.description;
      movieImageUrl = movie.image_url;
      movieArtist = movie.artist;
      movieGenre = movie.genre;
      moviePrice = movie.ticket_price;
      movieTotalSeats = movie.unReservedSeats;
      movieTrailorUrl = movie.trailor_url;
      movieDuration = movie.duration;
      movieLanguage = movie.language;
      movieCity = movie.city;
      // if (recipe['ingredients']) {
      //   for (let ingredient of recipe.ingredients) {
      //     recipeIngredients.push(
      //       new FormGroup({
      //         name: new FormControl(ingredient.name, Validators.required),
      //         amount: new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }

    this.movieForm = new FormGroup({
      name: new FormControl(movieName, Validators.required),
      image_url: new FormControl(movieImageUrl, Validators.required),
      description: new FormControl(movieDescription, Validators.required),
      artist: new FormControl(movieArtist, Validators.required),
      genre: new FormControl(movieGenre, Validators.required),
      ticket_price: new FormControl(moviePrice, Validators.required),
      unreserved_seats: new FormControl(movieTotalSeats, Validators.required),
      trailor_url: new FormControl(movieTrailorUrl),
      duration: new FormControl(movieDuration, Validators.required),
      language: new FormControl(movieLanguage, Validators.required),
      city: new FormControl(movieCity, Validators.required),
      
      // ingredients: recipeIngredients
    });
  }
}
