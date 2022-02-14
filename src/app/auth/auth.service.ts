import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface AuthResponseDataSignup {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(name:string,email: string, password: string,role:string) {
    return this.http
      .post<any>(
        'https://localhost:44355/api/Users/Register',
        {
          name:name,
          email: email,
          password: password,
          role:role
        }
      )
      // .pipe(
      //   catchError(this.handleError),
      //   tap(resData => {
      //     this.login(resData.email,resData.password)
      //   })
      // );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        'https://localhost:44355/api/Users/Login',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        // catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.access_token,
            resData.token_type,
            resData.expires_in,
            resData.user_id,
            resData.expiration_Time
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      access_token: string;
      token_type: string;
      expires_in: number;
      user_id: string;
      expiration_time:string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.access_token,
      userData.token_type,
      userData.expires_in,
      userData.user_id,
      new Date(userData.expiration_time)
    );

    if (loadedUser.access_token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.expiration_time).getTime() -
        new Date().getTime();
      // this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    access_token: string,
    token_type:string,
    expiresIn: number,
    user_id: string,
    expiration_Time:Date
   
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(access_token,token_type,expiresIn,user_id,expiration_Time);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // private handleAuthenticationSignUp(
  //   name: string,
  //   email:string,
  //   password: number,
  //   role: string,
    
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(access_token,token_type,expiresIn,user_id,expiration_Time);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
