// import { Ingredient } from '../shared/ingredient.model';

export class Movie {
  public id:number;
  public name: string;
  public description: string;
  public artist:string;
  public language:string;
  public duration:string;
  public ticket_price:number;
  public city:string;
  public rating:number;
  public unreserved_seats:number;
  public unReservedSeats:number;
  public reservedSeats:number;
  public genre:string;
  public image_url:string;
  public trailor_url=''
  // public ingredients: Ingredient[];

  /**
   *
   */
  constructor(
    id:number,
    name:string,description:string,
    artist:string,language:string,
    duration:string,ticket_price,
    city:string,rating:number,
    unreserved_seats:number,
    reservedSeats:number,
    genre:string,image_url:string,
    trailor_url:string
    
    )
    {
      this.id=id;
      this.name=name;
      this.image_url=image_url;
      this.ticket_price=ticket_price;
      this.description=description;
      this.artist=artist;
      this.language=language;
      this.trailor_url=trailor_url;
      this.city=city;
      this.unreserved_seats=unreserved_seats;
      this.reservedSeats=reservedSeats;
      this.unReservedSeats=unreserved_seats;

    }
  

  // constructor(name: string, desc: string, imagePath: string) {
  //   this.name = name;
  //   this.description = desc;
  //   this.imagePath = imagePath;
  // }
}
