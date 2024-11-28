import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../model/user.model';
import {Ride} from '../model/ride.model';
import {UserService} from '../service/user.service';
import {RideService} from '../service/ride.service';

@Component({
  selector: 'app-ride-register-view',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ride-register-view.component.html',
  styleUrl: './ride-register-view.component.css'
})
export class RideRegisterViewComponent {
  abfort?: string;
  abfortC?: string;
  ankort?: string;
  ankortC?: string;
  datum?: string;
  abfzeit?: string;
  fplatz?: number;


  constructor(private rideService: RideService) {
  }


  registerRide: FormGroup = new FormGroup({
    'abfort': new FormControl(),
    'abfortC': new FormControl(),
    'ankort': new FormControl(),
    'ankortC': new FormControl(),
    'datum': new FormControl(),
    'abfzeit': new FormControl(),
    'fplatz': new FormControl()
  })

  registerRideFunction() {
    this.abfort=this.registerRide.get('abfort')?.value;
    this.abfortC=this.registerRide.get('abfortC')?.value;
    this.ankort=this.registerRide.get('phonenr')?.value;
    this.datum=this.registerRide.get('datum')?.value;
    this.abfzeit=this.registerRide.get('abfzeit')?.value;
    this.fplatz=this.registerRide.get('fplatz')?.value;

    let newRide :Ride = <Ride>{};

    if (this.abfort != null) {
      newRide.placeOfDeparture = this.abfort;
    }
    if (this.ankort != null) {
      newRide.placeOfArrival = this.ankort;
    }
    if (this.fplatz != null) {
      newRide.availableSeats = this.fplatz;
    }

    newRide.departureTime = new Date()
    newRide.driver = "not yet"

    this.rideService.createNewRide(newRide);

    console.log('Saved')
  }
}
