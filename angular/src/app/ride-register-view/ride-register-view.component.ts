import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {User} from '../model/user.model';
import {BackendRide, Ride} from '../model/ride.model';
import {UserService} from '../service/user.service';
import {RideService} from '../service/ride.service';
import {NgIf} from "@angular/common";
import { DateTime } from 'luxon';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-ride-register-view',
  standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      NavbarComponent,
      RouterLink,
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

  constructor(private rideService: RideService, private router: Router) {
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

  async registerRideFunction() {

    this.abfort = this.registerRide.get('abfort')?.value;
    //this.abfortC = this.registerRide.get('abfortC')?.value;
    this.ankort = this.registerRide.get('ankort')?.value;
    //this.ankortC = this.registerRide.get('ankortC')?.value;
    this.datum = this.registerRide.get('datum')?.value;
    this.abfzeit = this.registerRide.get('abfzeit')?.value;
    this.fplatz = this.registerRide.get('fplatz')?.value;

    const combinedDateTime = DateTime.fromFormat(
      `${this.datum} ${this.abfzeit}`,
      'yyyy-MM-dd HH:mm'
    );
    let newRide: BackendRide = <BackendRide>{};

    console.log(this.abfort)

    let coordinates1 = await this.rideService.getCoordinates(this.abfort)
    //console.log("coordinates in component ", coordinates1)
    let lat = coordinates1.results[0].lat;
    let lon = coordinates1.results[0].lon;

    const coordinatesFrom = `${lat},${lon}`;
    console.log(coordinatesFrom);


    let coordinates2 = await this.rideService.getCoordinates(this.ankort)
    //console.log("coordinates in component ", coordinates2)
    let lat2 = coordinates2.results[0].lat;
    let lon2 = coordinates2.results[0].lon;

    const coordinatesTo = `${lat2},${lon2}`;
    console.log(coordinatesTo);


    if (this.abfort != null) {
      newRide.placeOfDeparture = this.abfort;
    }
    if (this.ankort != null) {
      newRide.placeOfArrival = this.ankort;
    }

    newRide.placeOfDepartureCoordinate = coordinatesFrom;
    newRide.placeOfArrivalCoordinate = coordinatesTo;

    if (this.fplatz != null) {
      newRide.availableSeats = this.fplatz;
    }
    if (this.abfzeit != null && this.datum) {
      newRide.departureTime = combinedDateTime;
    }

    if (sessionStorage.getItem('isloged') == 'true') {
      newRide.driver = sessionStorage.getItem('username');

      this.submitted = true

      if (this.registerRide.valid) {

        this.submitted = false
        console.log('new ride valid.');
        console.log("submitted" + this.submitted)

        this.rideService.createNewRide(newRide);
        console.log(this.abfort, this.ankort, this.fplatz, this.datum, this.abfzeit)

        console.log('Saved')
        //window.location.reload();
        alert("saved ride")
        this.router.navigate(['/rides']);

      } else {
        //this.submitted = true
        console.log("submitted " + this.submitted)
        console.log("please fill out correct")
      }
    } else {
      alert("please log in")
    }
  }


}
