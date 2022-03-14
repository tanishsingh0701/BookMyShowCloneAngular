import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie_admin.service';

@Component({
  selector: 'app-movie-start',
  templateUrl: './movie-start.component.html',
  styleUrls: ['./movie-start.component.css']
})
export class MovieStartComponent implements OnInit {

  movies: Movie[];
  moviesAvailable:boolean=true;
  constructor(private movieService:MovieService) { }

  ngOnInit() {
    this.movieService.moviesChanged.subscribe(res=>
      {
        this.movies=res;

        if(this.movies.length>0)
        {
          this.moviesAvailable=true;

        }
        else
        {
          this.moviesAvailable=false;

        }
      })
  }

}
