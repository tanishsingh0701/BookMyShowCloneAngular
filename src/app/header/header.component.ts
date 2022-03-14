import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Movie } from '../admin/movie.model';
import { MovieService } from '../admin/movie_admin.service';
import { UserData } from '../admin/userdata.model';
import { AuthService } from '../auth/auth.service';

// import { DataStorageService } from '../shared/data-storage.service';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  movies: Movie[];

  myControl = new FormControl();

  
  isAuthenticated = false;
  private userSub: Subscription;
  
  public userType:string;
  userData:UserData;
  searchTerm: string;
  @Input() user_type:any;

  constructor(
    // private dataStorageService: DataStorageService,
    private authService: AuthService,
    private movieService:MovieService,
    private router: Router
  ) {
    this.movies=this.movieService.getMovies();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
      // this.userType=user.user_type;
      
    });



    this.movieService.moviesChanged
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );

      this.myControl.valueChanges.subscribe(res => 
        {
          this.search(res);
        });
    

    
// if(this.user_type!=null){
//   alert("ok");
// }
    // this.authService.user.subscribe(res =>
    //   {
    //     if(res)
    //     {
    //       this.userData = JSON.parse(localStorage.getItem('userData'));
    //       this.userType=this.userData.user_type;
    //     }
    //     else
    //     {
    //       this.userType='';
    //     }
    //   });


  }

  onLogin()
    {
      this.movieService.loginOption.next("login");
      
    }

    onRegister()
    {
      this.movieService.loginOption.next("register");

    }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  search(value: string): void {

    this.movieService.searchTriggered.next(value);
    this.router.navigate(['/movie']);
    
    
  }
}
