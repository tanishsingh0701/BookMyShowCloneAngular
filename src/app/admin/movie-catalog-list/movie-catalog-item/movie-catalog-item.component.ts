import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movie-catalog-item',
  templateUrl: './movie-catalog-item.component.html',
  styleUrls: ['./movie-catalog-item.component.css']
})
export class MovieCatalogItemComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;

  ngOnInit() {
  }
}
