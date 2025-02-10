import {Injectable, model} from '@angular/core';
import {BackendRide, RateRide, RegisterRide, Ride} from '../model/ride.model';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Filter} from '../model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private url = "http://localhost:8080/api/drivus/rides"

  constructor(private http: HttpClient) {
  }

  getRides(category: string): Observable<Ride[]> {
    let username = sessionStorage.getItem("username")
    if(username == null) {
      username = "none"
    }
    console.log("check username in getRides " + username)
    return this.http.get<Ride[]>(this.url + "/" + category + "/" + username);
  }

  createNewRide(ride: BackendRide) {
    console.log("in createRide")
    console.log(ride)

    this.http.post<Ride>(this.url + '/postRide', ride).subscribe(ride => {

      console.log('Updated ride:', ride);
    });
  }

  getSeat(ride: Ride) {
    console.log("in getSeat: ", ride)

    let newRegister: RegisterRide = <RegisterRide>{};

    if (ride.id != null) {
      newRegister.rideId = ride.id;
    }

    let user = sessionStorage.getItem("username");

    if (user) {
      // Make sure newRegister is defined
      if (typeof newRegister === "object") {
        newRegister.username = user;
      } else {
        console.error("newRegister is not defined or not an object.");
      }
    }

    console.log(newRegister)

    this.http.post(this.url + '/registerForRide', newRegister).subscribe(registerRide => {
      console.log('booked ride: ', registerRide);
    });

    this.getRides("available")
  }

  unbookSeat(ride: Ride) {
    console.log("unbookseat this.seat: ", ride)

    let newRegister: RegisterRide = <RegisterRide>{};

    if (ride.id != null) {
      newRegister.rideId = ride.id;
    }
    let user  = sessionStorage.getItem("username");

    if (user == null) {
      user = "";
    }

    newRegister.username = user;
    console.log(newRegister," newRegister")

    this.http.post(this.url + '/unregisterForRide', newRegister).subscribe(registerRide => {
      console.log('booked ride: ', registerRide);
    });

    this.getRides("available")
  }

  isSeatBooked(rideId: number, username: string): Observable<number> {
    // Erstellung des Payload-Objekts für die API-Anfrage
    const payload = {rideId, username};
    return this.http.post<number>(`http://localhost:8080/api/drivus/bookedSeatCheck`, payload);
  }

  updateRide(ride: any) {
    return this.http.post(`http://localhost:8080/api/drivus/rides/changeRide`, ride);
  }


  filterRides(filteredText: Filter)  {
    return this.http.post<Ride[]>(this.url + '/getFilteredCount', filteredText);
  }

  /*getRides2(filteredText: Filter) {
    console.log(filteredText)
    if (filteredText) {
      return this.http.get<Ride[]>(this.url);
    } else {
      return this.http.post<Ride[]>(this.url + '/getFilteredCount', filteredText);
    }
  }*/

  async getCoordinates(city: string | undefined) {
    let coordinates = await fetch("https://api.geoapify.com/v1/geocode/search?text="+city+"&format=json&apiKey=079e1704b7364a71bf61544ad1928dcb")
    let coordinatesJson = await coordinates.json();
    //console.log(coordinatesJson)
    return coordinatesJson;
  }

  deleteRide(id: number) {
    console.log("deleteRide in service")
    return this.http.post(this.url + '/deleteRide',id);
  }

  rateRide(newRating: RateRide) {
    console.log("rateRide: " + newRating.id + newRating.stars)
    return this.http.post(this.url + '/rating', newRating);
  }
}


  export async function getSeat(ride: Ride) {
    console.log(ride)
    var url = "./api/drivus/rides/registerForRide"
    var id = ride.id
    console.log(id)
  }


