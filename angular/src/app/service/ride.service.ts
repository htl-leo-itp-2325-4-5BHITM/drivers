import {Injectable, model} from '@angular/core';
import {Ride} from '../model/ride.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private ridesURL = "/api/drivus/rides"

  constructor(private http: HttpClient) { }

  getRides() {
      let rides: Ride[] =  this.http.get(this.ridesURL) as Ride[]
      console.log(rides)
      return rides
  }
}
