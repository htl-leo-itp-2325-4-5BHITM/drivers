import {Injectable, model} from '@angular/core';
import {Ride} from '../model/ride.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private url = "http://localhost:8080/api/drivus/rides"

  constructor(private http: HttpClient) { }

  getRides() : Observable<Ride[]>{
      //let rides: Observable<Ride[]>
    /*
    this.http.get<Ride>(this.url).subscribe(rides => {
      console.log('load rides:', rides);
      rides = rides
    });
      console.log(rides)
      return rides*/
    return this.http.get<Ride[]>(this.url);
  }

  createNewRide(ride: Ride) {
    console.log("in createRide")
    console.log(ride)

    this.http.post<Ride>(this.url + '/postRide', ride).subscribe(ride => {
      console.log('Updated ride:', ride);
    });
  }
}
