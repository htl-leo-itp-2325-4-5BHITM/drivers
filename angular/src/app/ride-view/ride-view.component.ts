import {Component, Input, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable} from 'rxjs';
import {HardDataService} from '../service/hard-data.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    DatePipe
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent implements OnInit {
  rides: Ride[] = [];


  constructor(private rideService: RideService, private hardData: HardDataService) {
    //this.rides = hardData.hardcodedRide
  }

  ngOnInit() {

    this.rideService.getRides().subscribe((value ) => {
      this.rides = value;
      console.log(this.rides);
    })
    /*this.getRidesFunction()
    console.log(this.rides)

     */
  }

  /*

  getRidesFunction(){
    //this.rides = this.rideService.getRides()
  }

*/


  //@Input() isLoggedIn: boolean = false;

}
