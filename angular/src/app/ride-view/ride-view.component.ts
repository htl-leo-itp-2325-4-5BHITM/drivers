import {Component, Input, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {getSeat, RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable} from 'rxjs';
import {DatePipe, NgForOf} from '@angular/common';
import {HardcodeService} from '../service/hardcode.service';

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

}
