import { Component } from '@angular/core';
import {RideService} from '../service/ride.service';
import {Router} from '@angular/router';
import {HardcodeService} from '../service/hardcode.service';
import {Subscription} from 'rxjs';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-statistiks',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './statistiks.component.html',
  styleUrl: './statistiks.component.css'
})
export class StatistiksComponent {
  ridesSubscription: Subscription = <Subscription>{};
  private offeredRides: number | undefined;
  private othersRides: number | undefined;

  private url = "http://localhost:8080/api/drivus/rides/getRidesOffered"
  private url2 = "http://localhost:8080/api/drivus/rides/getOthersRides"

  constructor(private rideService: RideService, private router: Router, private hardCoded: HardcodeService) {
  }

  getRidesOffered() {
    // @ts-ignore
    /*this.rideService.getRidesOffered(sessionStorage.getItem('username')).subscribe((rides) => {
      this.offeredRides = rides;
      console.log('All Rides:', this.offeredRides);
    });*/
    var user = sessionStorage.getItem("username")

    let data = {"username": user};
    const jsonData = JSON.stringify(data);
    console.log(jsonData)

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then(response => {
        return response.json()

      })
      .then(data => {
        console.log(data);
        this.offeredRides = data;
        /* const users: DrivUser[] = data
        const model: ModelUser = {
            drivUsers: users
        }
        storeUsers.next(model)*/
      })
      .catch(error => {
        // Handle Fehler hier
        console.error(error)
      });
    return this.offeredRides;
  }

  getRidesOthers() {
    var user = sessionStorage.getItem("username")

    let data = {"username": user};
    const jsonData = JSON.stringify(data);
    console.log(jsonData)

    fetch(this.url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.othersRides = data;

        // Erst nachdem die Daten empfangen wurden, den Chart erstellen
        //this.createChart(data);
      })
      .catch(error => {
        // Fehlerbehandlung
        console.error(error);
      });
  }


}
