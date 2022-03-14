import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Movie } from './movie.model';
import { Reservation } from './reservation.model';
import { UserData } from './userdata.model';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
// @Injectable({ providedIn: 'root' })
export class MovieService {
  loginOption=new BehaviorSubject<string>("login");
  public searchTriggered=new BehaviorSubject<string>(null);
  public listClicked=new Subject<boolean>();
  moviesChanged = new Subject<Movie[]>();
  movieBookChanged=new Subject<boolean>();
  movieBookTriggered=new Subject<string>();
  movieTotalEarningTriggered=new Subject<number>();
  movieBookSet=new Subject<Reservation[]>();
  movie_id:number;
  userData:UserData;
  totalEarning:number;

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private movies: Movie[] = [];
  private reservation:Reservation[]=[];

  constructor(private http: HttpClient) {}

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
    console.log(movies);
  }

  setReservation(reservation: Reservation[]) {
    this.reservation = reservation;
    // this.movieBookChanged.next(true);
    console.log("This is reservation Array");
    console.log(this.reservation);
    this.movieBookSet.next(this.reservation.slice());
    console.log(reservation);
  }

  getMovies() {
    return this.movies.slice();
  }

  
  getReservation()
  {
    return this.reservation.slice();
  }

  getMovie(index: number) {
    console.log(this.movies);
    return this.movies[index];
  }

  

  addMovie(movie: Movie) {
    movie.unReservedSeats=movie.unreserved_seats;
    this.movies.push(movie);
    console.log(movie);
    this.moviesChanged.next(this.movies.slice());
    this.moviePostRequest(
      movie.name,
    movie.duration,movie.description,
    movie.language,movie.rating,
    movie.genre,
    movie.unreserved_seats,movie.artist,
    movie.ticket_price,movie.city,
    movie.trailor_url,movie.image_url).subscribe();

  }

  bookMovie(id:number,quantity:number,phone:string,index:number)
  {
    
    this.movieBookPostRequest(id,quantity,phone).subscribe();
    this.movies[index].unReservedSeats-=quantity;
    this.moviesChanged.next(this.movies.slice());
    // this.movieBookChanged.next(true);
    // this.movieBookTriggered.next("changed");
    
  }


  getBookMovie()
  {
    this.movieBookGetRequest();

  }

  movieBookGetRequest()
  {
    return this.http
      .get<Reservation[]>(
        'https://localhost:44355/api/Reservation',
      )
      .pipe(
        map(reservations => {
          return reservations.map(reservation => {
            return {
              ...reservation,
              // ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(reservations => {
          this.setReservation(reservations);
        })
      );

  }


  
  movieBookGetTotalEarning()
  {
    return this.http
      .get<any>(
        'https://localhost:44355/api/Reservation/totalEarningAll',
      );
      
  }

  movieBookGetSingleEarning(id:number)
  {
    var movieId=this.movies[id].id;
    return this.http
      .get<any>(
        'https://localhost:44355/api/Reservation/totalEarningSingle/'+movieId,
      );
      
  }

  movieBookPostRequest(id:number,quantity:number,phone:string)
  {
    return this.http
    .post<any>(
      'https://localhost:44355/api/Reservation',
      {
        qty:quantity,
        phone: phone,
        eventId:id
        
      }
    );

    // return this.http
    // .post<any>(
    //   'https://localhost:44355/api/Events',body
    // ).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }

  getSearchableMovies(find:string)
  {
    // console.log("reached in service");
    return this.http
    .get<Movie[]>(
      'https://localhost:44355/api/Events/search/'+find,
    )
    .pipe(
      map(movies => {
        return movies.map(movie => {
          return {
            ...movie,
          };
        });
      }),
      tap(movies => {
        this.setMovies(movies);
      })
    );

  }

  updateMovie(index: number, newMovie: Movie) {
    // this.movies[index] = newMovie;
    this.movies[index].name=newMovie.name;
    this.movies[index].description=newMovie.description;
    this.movies[index].artist=newMovie.artist;
    this.movies[index].ticket_price=newMovie.ticket_price;
    this.movies[index].image_url=newMovie.image_url;
    this.movies[index].unreserved_seats=newMovie.unreserved_seats;
    this.movies[index].trailor_url=newMovie.trailor_url;
    this.movies[index].genre=newMovie.genre;
    this.movies[index].language=newMovie.language;
    this.movies[index].city=newMovie.city;
    this.movies[index].duration=newMovie.duration;
    this.movies[index].unReservedSeats=newMovie.unreserved_seats;
    // need to add for particular field like movie[index].name=newMovie.name
    var movieId=this.movies[index].id;
    console.log(newMovie);
    // this.movie_id=this.getMovieId(index);
    // console.log("movieId"+this.movie_id);
    
    this.moviesChanged.next(this.movies.slice());
    this.moviePutRequest(newMovie,movieId).subscribe();
  }

  // https://localhost:44355/api/Events/1


  moviePutRequest(movies:Movie,id:number)
  {

    // let body = new FormData();
    // body.append('Name',name);
    // body.append('Description',description);
    // body.append('Artist',artist);
    // body.append('Language',language);
    // body.append('Duration',duration);
    // body.append('TicketPrice',ticket_price.toString());
    // body.append('Rating',rating.toString());
    // body.append('Genre',genre);
    // body.append('City',city);
    // body.append('UnReservedSeats',unReservedSeats.toString());
    // body.append('TrailorUrl',trailor_url);

    return this.http
    .put<any>(
      'https://localhost:44355/api/Events/'+id,
      {
        name:movies.name,
        description: movies.description,
        artist: movies.artist,
        language:movies.language,
        duration:movies.duration,
        rating:movies.rating,
        ImageUrl:movies.image_url,
        TicketPrice:movies.ticket_price,
        genre:movies.genre,
        TrailorUrl:movies.trailor_url,
        city:movies.city,
        UnReservedSeats:movies.unreserved_seats
      }
    );

    // return this.http
    // .post<any>(
    //   'https://localhost:44355/api/Events',body
    // ).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }



  moviePostRequest(name:string,
    duration:string,description:string,
    language:string,rating:number,
    genre:string,
    unreserved_seats:number,artist:string,
    ticket_price:number,city:string,
    trailor_url:string,image_url:string    
    )
  {

    // let body = new FormData();
    // body.append('Name',name);
    // body.append('Description',description);
    // body.append('Artist',artist);
    // body.append('Language',language);
    // body.append('Duration',duration);
    // body.append('TicketPrice',ticket_price.toString());
    // body.append('Rating',rating.toString());
    // body.append('Genre',genre);
    // body.append('City',city);
    // body.append('UnReservedSeats',unReservedSeats.toString());
    // body.append('TrailorUrl',trailor_url);

    return this.http
    .post<any>(
      'https://localhost:44355/api/Events',
      {
        name:name,
        description: description,
        artist: artist,
        language:language,
        duration:duration,
        rating:rating,
        ImageUrl:image_url,
        Rating:rating,
        TicketPrice:ticket_price,
        genre:genre,
        TrailorUrl:trailor_url,
        city:city,
        UnReservedSeats:unreserved_seats
      }
    );

    // return this.http
    // .post<any>(
    //   'https://localhost:44355/api/Events',body
    // ).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }

  deleteMovie(index: number) {
    var movieId=this.movies[index].id;
    // console.log("movie Id"+movieId)

    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());

    return this.http
    .delete<any>(
      'https://localhost:44355/api/Events/'+movieId,
    )
    
    // this.dataStorage.deleteMovies(movieId);
    
    
  }

  getMovieId(id:number)
  {
    var movieId= this.movies[id].id;
    // console.log(movie);
    return movieId;
  }

  getRemainingSeats(id:number)
  {
    var remainingSeats= this.movies[id].unReservedSeats;
    // console.log(movie);
    return remainingSeats;
  }

  getUserType()
  {
  
    this.userData = JSON.parse(localStorage.getItem('userData'));
    // this.userData=
    if(this.userData)
    {
      return this.userData.user_type;

    }
    return '';
    
  }
}
