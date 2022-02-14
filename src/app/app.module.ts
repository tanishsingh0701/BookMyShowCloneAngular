import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MovieDetailComponent } from './admin/movie-detail/movie-detail.component';
import { MovieEditComponent } from './admin/movie-edit/movie-edit.component';
import { MovieItemComponent } from './admin/movie-list/movie-item/movie-item.component';
import { MovieListComponent } from './admin/movie-list/movie-list.component';
import { MovieStartComponent } from './admin/movie-start/movie-start.component';
import { MoviesComponent } from './admin/movie.component';
import { MovieService } from './admin/movie_admin.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MovieItemComponent,
    MovieListComponent,
    MoviesComponent,
    MovieEditComponent,
    MovieDetailComponent,
    MovieStartComponent,
    LoadingSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
