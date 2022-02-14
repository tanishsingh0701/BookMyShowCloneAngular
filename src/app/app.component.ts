import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private authService: AuthService
    // ,private loggingService:LoggingService
    ) {}

    ngOnInit() {
      this.authService.autoLogin();
      // this.loggingService.printLog('Hello from AppComponent ngOnInit');
    }
  title = 'BookMyShowClone';
}
