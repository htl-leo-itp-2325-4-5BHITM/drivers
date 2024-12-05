import {Injectable, model} from '@angular/core';
import {RegisterRide, Ride} from '../model/ride.model';
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
    return this.http.get<Ride[]>(this.url);
  }

  createNewRide(ride: Ride) {
    console.log("in createRide")
    console.log(ride)

    this.http.post<Ride>(this.url + '/postRide', ride).subscribe(ride => {
      console.log('Updated ride:', ride);
    });
  }

  getSeat(ride: Ride) {
    console.log("in getSeat: ", ride)

    let newRegister :RegisterRide = <RegisterRide>{};

    if (ride.id != null) {
      newRegister.rideId = ride.id;
    }
    newRegister.username = "test";

    console.log(newRegister)

    this.http.post(this.url + '/registerForRide', newRegister).subscribe(registerRide => {
      console.log('booked ride: ', registerRide);
    });

    this.getRides()
  }
}

  export async function getSeat(ride: Ride) {
  console.log(ride)
  var url = "./api/drivus/rides/registerForRide"
  var id = ride.id
  console.log(id)

}
