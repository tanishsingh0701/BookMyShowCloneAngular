// import { Ingredient } from '../shared/ingredient.model';

export class Reservation {
    public id:number;
    public reservationTime: string;
    public customerName: string;
    public eventName:string;
    public quantity:string;
    
    constructor(
      Id:number,
      ReservationTime:string,
      CustomerName:string,
      EventName:string,
      Quantity:string
      )
      {
        this.id=Id;
        this.reservationTime=ReservationTime;
        this.customerName=CustomerName;
        this.eventName=EventName;
        this.quantity=Quantity;
        
      }
    
  
    // constructor(name: string, desc: string, imagePath: string) {
    //   this.name = name;
    //   this.description = desc;
    //   this.imagePath = imagePath;
    // }
  }
  