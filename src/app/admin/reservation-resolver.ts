import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { MovieService } from './movie_admin.service';
import { Reservation } from './reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationResolverService implements Resolve<Reservation[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private moviesService: MovieService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const reservation = this.moviesService.getReservation();

    if (reservation.length === 0) {
      return this.dataStorageService.fetchReservation();
    } else {
      return reservation;
    }
  }
}
