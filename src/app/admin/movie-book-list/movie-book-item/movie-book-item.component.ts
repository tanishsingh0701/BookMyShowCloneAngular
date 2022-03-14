import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../movie.model';
import { Reservation } from '../../reservation.model';

@Component({
  selector: 'app-movie-book-item',
  templateUrl: './movie-book-item.component.html',
  styleUrls: ['./movie-book-item.component.css']
})
export class MovieBookItemComponent implements OnInit {
@Input() reservation: Reservation;
  @Input() index: number;

  ngOnInit() {
  }
}
