import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MovieBookItemComponent } from './admin/movie-book-list/movie-book-item/movie-book-item.component';
import { MovieBookListComponent } from './admin/movie-book-list/movie-book-list.component';
import { MovieBookComponent } from './admin/movie-book/movie-book.component';
import { MovieDetailComponent } from './admin/movie-detail/movie-detail.component';
import { MovieEditComponent } from './admin/movie-edit/movie-edit.component';
import { MovieItemComponent } from './admin/movie-list/movie-item/movie-item.component';
import { MovieListComponent } from './admin/movie-list/movie-list.component';
import { MovieStartComponent } from './admin/movie-start/movie-start.component';
import { MoviesComponent } from './admin/movie.component';
import { MovieService } from './admin/movie_admin.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieCatalogListComponent } from './admin/movie-catalog-list/movie-catalog-list.component';
import { MovieCatalogItemComponent } from './admin/movie-catalog-list/movie-catalog-item/movie-catalog-item.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MovieItemComponent,
    MovieBookItemComponent,
    MovieListComponent,
    MovieCatalogListComponent,
    MovieCatalogItemComponent,
    MoviesComponent,
    MovieEditComponent,
    MovieBookListComponent,
    MovieBookComponent,
    MovieDetailComponent,
    MovieStartComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
    
    
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
