import {Injectable, model} from '@angular/core';
import {BackendRide, RegisterRide, Ride} from '../model/ride.model';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../model/user.model';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
import {Driver} from './hardcode.service';
import {Filter} from '../model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private url = "http://localhost:8080/api/drivus/rides"
  //private ridesSubject: Subject<Ride> = new Subject<Ride>();

  constructor(private http: HttpClient) { }

  getRides() : Observable<Ride[]>{
    return this.http.get<Ride[]>(this.url);
  }

  /*getRides2() : Observable<Ride[]>{
    this.ridesSubject.next(this.getRides())
  }*/

  createNewRide(ride: BackendRide) {
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

    //let user = sessionStorage.getItem("username");
    //console.log(user)

    newRegister.username = "test";

    console.log(newRegister)

    this.http.post(this.url + '/registerForRide', newRegister).subscribe(registerRide => {
      console.log('booked ride: ', registerRide);
    });

    this.getRides()
  }

  unbookSeat(ride: Ride) {
    console.log("unbookseat this.seat: ", ride)

    let newRegister :RegisterRide = <RegisterRide>{};

    if (ride.id != null) {
      newRegister.rideId = ride.id;
    }

    //let user = sessionStorage.getItem("username");
    //console.log(user)

    newRegister.username = "test";

    console.log(newRegister)

    this.http.post(this.url + '/unregisterForRide', newRegister).subscribe(registerRide => {
      console.log('booked ride: ', registerRide);
    });

    this.getRides()
  }


  filterRides(filteredText: Filter)  {
    return this.http.post<Ride[]>(this.url + '/getFilteredCount', filteredText);
  }

  getRides2(filteredText: Filter) {
    console.log(filteredText)
    if(filteredText) {
      return this.http.get<Ride[]>(this.url);
    } else {
      return this.http.post<Ride[]>(this.url + '/getFilteredCount', filteredText);
    }
  }

}

  export async function getSeat(ride: Ride) {
  console.log(ride)
  var url = "./api/drivus/rides/registerForRide"
  var id = ride.id
  console.log(id)

}
