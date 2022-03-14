import { Component } from '@angular/core';
import { MovieService } from './admin/movie_admin.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user_type:string;
  
  constructor(private authService: AuthService,
    private movieServie:MovieService
    // ,private loggingService:LoggingService
    ) {
      this.authService.autoLogin();
      authService.userdetails.subscribe(res =>
        {
          this.user_type=res;
        });

      if(!this.user_type)
      {
        this.user_type=movieServie.getUserType();

      }
      
    }

    ngOnInit() {
      // this.authService.autoLogin();
      
    }
  title = 'BookMyShowClone';
}
