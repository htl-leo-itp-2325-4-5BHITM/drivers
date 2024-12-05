import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {Ride} from '../model/ride.model';
import {UserService} from '../service/user.service';
import {RideService} from '../service/ride.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ride-register-view',
  standalone: true,
    imports: [
        NavbarComponent,
        ReactiveFormsModule,
        NgIf
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

  submitted = false;

  constructor(private rideService: RideService) {
  }


  registerRide: FormGroup = new FormGroup({
    'abfort': new FormControl(null, Validators.required),
    'abfortC': new FormControl(),
    'ankort': new FormControl(null, Validators.required),
    'ankortC': new FormControl(),
    'datum': new FormControl(null, Validators.required),
    'abfzeit': new FormControl(null, Validators.required),
    'fplatz': new FormControl(null, Validators.required)
  })

  registerRideFunction() {
    console.log(this.abfort,this.ankort,this.datum,this.abfzeit)

    this.abfort=this.registerRide.get('abfort')?.value;
    this.abfortC=this.registerRide.get('abfortC')?.value;
    this.ankort=this.registerRide.get('ankort')?.value;
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
    if (this.abfzeit != null) {
      //newRide.departureTime = this.abfzeit;
    }


    /*if (this.datum && this.abfzeit) {
      const departureDate = new Date(`${this.datum}T${this.abfzeit}`);
      newRide.departureTime = departureDate.getTime()
    } else {
      console.error("Datum oder Uhrzeit fehlt!");
      return;
    }*/


    newRide.driver = "not yet"

    this.rideService.createNewRide(newRide);

    this.onSubmit()
    this.submitted = false

    console.log(this.abfort,this.ankort, this.fplatz, this.datum, this.abfzeit)

    console.log('Saved')
  }

  onSubmit(){
    this.submitted = true;

    if (this.registerRide.valid) {
      console.log('Login valid.');
    } else {
      console.error('Login not valid');
    }
  }


}
