import {Component, Input, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {getSeat, RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable} from 'rxjs';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
//import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    DatePipe,
    DriverRideViewComponent,
    NgIf,
    //MapComponent
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent implements OnInit {
  rides: Ride[] = [];
  driver: string = "";
  selectedRide: Ride = <Ride>{};
  showDriver: boolean=false;


  constructor(private rideService: RideService, private hardData: HardcodeService) {
    //für andrei wegn backend einf auskommentieren wenn backend rennt
    //this.rides = hardData.hardcodedRide
  }

  ngOnInit() {
    this.rideService.getRides().subscribe((value) => {
      this.rides = value;
      console.log(this.rides);
    })
  }
  /*getSeat(ride: Ride){
    this.rideService.getSeat(ride)
  }*/


  //fia de Detailansicht
  onStateChange(newState: boolean) {
    this.showDriver = newState;
  }

}
