import {Component, Input, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {UserService} from '../service/user.service';
import {RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './ride-view.component.html',
  styleUrl: './ride-view.component.css'
})
export class RideViewComponent implements OnInit {
    private rides :Ride[] = [];


    constructor(private rideService: RideService) {

    }

    ngOnInit() {
      this.rideService.getRides().subscribe((value ) => {
        this.rides = value;
        console.log(this.rides);
      })
      /*this.getRidesFunction()
      console.log(this.rides)*/
    }

    getRidesFunction(){
      //this.rides = this.rideService.getRides()
    }




  //@Input() isLoggedIn: boolean = false;

}
