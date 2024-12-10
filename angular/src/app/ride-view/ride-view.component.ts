import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {getSeat, RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable, Subscription} from 'rxjs';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
import {MapComponent} from '../map/map.component';
//import {MapComponent} from '../map/map.component';
import {FilterComponent} from '../filter/filter.component';
import {ActivatedRoute, Route, Router, RouterLink} from '@angular/router';
import {Filter} from '../model/filter.model';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    DatePipe,
    DriverRideViewComponent,
    NgIf,
    MapComponent,
    //MapComponent
    NgClass,
    FilterComponent,
    RouterLink
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent implements OnInit, OnDestroy {
  rides: Ride[] = [];
  ridesSubscription: Subscription = <Subscription>{};
  driver: string = "";
  selectedRide: Ride = <Ride>{};
  showDriver: boolean=false;
  showFilter: boolean=false;

  constructor(private rideService: RideService, private hardData: HardcodeService, private router: Router, private route: ActivatedRoute) {
    //für andrei wegn backend einf auskommentieren wenn backend rennt
    //this.rides = hardData.hardcodedRide
  }

  ngOnInit() {


    //this.filteredRides = this.route.snapshot.paramMap.get('filtered')
    //console.log(this.filteredRides)
    //this.rideService.filterRides(filter).

    this.ridesSubscription = this.rideService.getRides().subscribe((value) => {
      this.rides = value;
      console.log(this.rides);
    })

  }

  ngOnDestroy() {
    this.ridesSubscription.unsubscribe()
  }

  getSeat(ride: Ride){
    this.rideService.getSeat(ride)
  }


  //fia de Detailansicht
  onStateChangeDriver(newState: boolean) {
    this.showDriver = newState;
  }

  onStateChangeFilter(newState: boolean) {
    this.showFilter=newState
  }
}
