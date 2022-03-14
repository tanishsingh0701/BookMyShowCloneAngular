import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, NgForm, AbstractControl } from '@angular/forms';

import { MovieService } from '../movie_admin.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-book.component.html',
  styleUrls: ['./movie-book.component.css']
})
export class MovieBookComponent implements OnInit {
  id: number;
  editMode = false;
  movieBookForm: FormGroup;
  unReservedSeats:number;
  movieName:string;
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
      this.movieName=this.movieService.getMovie(this.id).name;
      
    });
    this.unReservedSeats=this.movieService.getRemainingSeats(this.id);
    

    // console.log("unReservedSeats "+this.unReservedSeats);
  }

  onSubmit(form: NgForm) {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    const movieId=this.movieService.getMovieId(this.id);
    const quantity=form.value.qty;
    const phone=form.value.phone;
      // console.log("ID:-"+this.id);
      this.unReservedSeats=this.movieService.getRemainingSeats(this.id);
      // if(form.value.qty)
      // {
      //   form.invalid;
      // }
      // console.log("Remaining seats: "+remainingSeats);
      // console.log(this.movieService.getMovie(this.id));
      this.movieService.bookMovie(movieId, quantity,phone,this.id);

    
    this.onCancel();
  }

  
  
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let movieQuantity = '';
    let customerPhone = '';
    
    this.movieBookForm = new FormGroup({
      qty: new FormControl(movieQuantity,[Validators.required,
        (control: AbstractControl) => Validators.max(this.unReservedSeats)(control),
        (control: AbstractControl) => Validators.min(1)(control)
      ],
        
        ),
      phone: new FormControl(customerPhone, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
     
    });
  }
}
