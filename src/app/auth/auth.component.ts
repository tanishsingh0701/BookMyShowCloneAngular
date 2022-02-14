import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData, AuthResponseDataSignup } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(){
    
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
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
      role = select.value;
      authObsSignup = this.authService.signup(name,email, password,role);
      authObsSignup.subscribe(res => 
        {
          if(res.email)
          {
            console.log(res.email+ " "+res.password);
            signUpSuccessfull=true;
            console.log(signUpSuccessfull);
            this.isLoginMode=true;
            
            this.isLoading = false;
            this.router.navigate(['/auth']);

          }
         
          
        },error =>
        {
          this.error=error.error;
          // console.log(error);
          this.isLoading=false;
        });
       
    }

    if(this.isLoginMode){

      console.log("you are in login")

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/movie']);
      },
      errorMessage => {
        console.log(errorMessage.error);
        this.error = "Email or Password incorrect";
        this.isLoading = false;
      }
    );
    }

    form.reset();
  }
}
