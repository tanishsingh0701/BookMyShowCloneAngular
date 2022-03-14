import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { Movie } from '../../movie.model';
import { MovieService } from '../../movie_admin.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;

 
  constructor(private movieService:MovieService) {
    
  }

  

  ngOnInit() {

  }

  // onListClick()
  // {
  //   console.log("on list click");
  //   this.movieService.listClicked.next(true);

  // }
}
