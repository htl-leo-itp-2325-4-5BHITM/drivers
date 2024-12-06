import {Component, Input, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {getSeat, RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable} from 'rxjs';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
import {FilterComponent} from '../filter/filter.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    DatePipe,
    DriverRideViewComponent,
    NgIf,
    FilterComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent implements OnInit {
  rides: Ride[] = [];
  driver: string = "";
  showDriver: boolean=false;
  showFilter: boolean = false;


  constructor(private rideService: RideService, private hardData: HardcodeService) {
    //für andrei wegn backend einf auskommentieren wenn backend rennt
    this.rides = hardData.hardcodedRide
  }

  ngOnInit() {
    this.rideService.getRides().subscribe((value) => {
      this.rides = value;
      console.log(this.rides);
    })
  }
  getSeat(ride: Ride){
    this.rideService.getSeat(ride)
  }


  //fia de Detailansicht
  onStateChangeDriver(newState: boolean) {
    this.showDriver = newState;
  }

  onStateChangeFilter(newState: boolean) {
    this.showFilter = newState;
  }

}
