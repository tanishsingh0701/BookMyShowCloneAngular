import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MovieService } from '../admin/movie_admin.service';

import { AuthService, AuthResponseData, AuthResponseDataSignup } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']

})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  user_type_subject=new Subject();
  selectedValue;

  constructor(private authService: AuthService, private router: Router,private movieService:MovieService) {
    
    
  }
  ngOnInit(){
    this.initForm();
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    // this.loginForm.reset();
    this.movieService.loginOption.subscribe(res =>
      {
        if(res == 'login')
        {
          this.isLoginMode=true;
          this.error='';
        }
        else
        {
          this.isLoginMode=false;
          this.error='';

        }

        if(this.isLoginMode)
        {
          // this.createLoginForm();
        }
        else{
          // this.createSignUpForm();
        }

      });
    
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error=null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    let authObs: Observable<AuthResponseData>;
    let authObs2: Observable<AuthResponseData>;
    let authObsSignup: Observable<AuthResponseDataSignup>;
    let signUpSuccessfull=false;
    var role:string;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      const select = document.querySelector("select");
      console.log("I am in signup");
      role = this.selectedValue;
      console.log("The role is:"+role);
      // role = "Admin";

      authObsSignup = this.authService.signup(name,email, password,role);
      authObsSignup.subscribe(res => 
        {
          if(res.email)
          {
            // console.log(res.email+ " "+res.password);
            signUpSuccessfull=true;
            // console.log(signUpSuccessfull);
            this.isLoginMode=true;
            
            this.isLoading = false;
            this.router.navigate(['/auth']);
            this.error=null;
            form.reset();
            form.resetForm()

          }
         
          
        },error =>
        {
          this.error=error.error;
          // console.log(error);
          this.isLoading=false;
        });
       
    }

    if(this.isLoginMode){

      // console.log("you are in login")

    authObs.subscribe(
      resData => {
        // console.log(resData);
        this.isLoading = false;
        this.authService.loginSuccess.next(true);
        this.router.navigate(['/movie']);
        form.reset();
        this.loginForm.reset();
      },
      errorMessage => {
        // console.log(errorMessage.error);
        this.error = "Email or Password incorrect";
        this.isLoading = false;
      }
    );
    }

    // this.loginForm.markAsPristine();
    // this.loginForm.markAsUntouched();

    form.form.markAsPristine();
    form.form.markAsUntouched();
    form.reset();

    // form.resetForm();
    // this.loginForm.reset();
  }

  // createSignUpForm() {
  //   this.loginForm = new FormGroup({
      
  //     email: this.email,
  //     password: this.password,
  //     name: this.name
  //   });
  // }

  // createLoginForm() {
  //   this.loginForm = new FormGroup({
  //     let emailValue='';
      
  //     email: new FormControl(movieName, Validators.required),
  //     password: this.password
  //   });
  // }

  private initForm() {
    let nameValue = '';
    let emailValue = '';
    let passwordValue = '';
    
    // let recipeIngredients = new FormArray([]);

    if (this.isLoginMode) {
      this.loginForm=new FormGroup(
        {
          email: new FormControl(emailValue, [Validators.required,Validators.email]),
          password: new FormControl(passwordValue, Validators.required),

        });
    }

    else
    {
      this.loginForm=new FormGroup(
        {
          name: new FormControl(nameValue, Validators.required),
          email: new FormControl(emailValue, [Validators.required,Validators.email]),
          password: new FormControl(passwordValue, Validators.required),

        });

    }
   
  }
}
