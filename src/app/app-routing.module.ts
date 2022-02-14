import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './admin/movie-detail/movie-detail.component';
import { MovieEditComponent } from './admin/movie-edit/movie-edit.component';
import { MoviesResolverService } from './admin/movie-resolver.service';
import { MovieStartComponent } from './admin/movie-start/movie-start.component';
import { MoviesComponent } from './admin/movie.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/movie', pathMatch: 'full' },
  {
    path: 'movie',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MovieStartComponent },
      { path: 'new', component: MovieEditComponent },
      {
        path: ':id',
        component: MovieDetailComponent,
        resolve: [MoviesResolverService]
      },
      {
        path: ':id/edit',
        component: MovieEditComponent,
        resolve: [MoviesResolverService]
      }
    ]
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
