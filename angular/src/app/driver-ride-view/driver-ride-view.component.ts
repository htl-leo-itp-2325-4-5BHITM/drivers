import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {Ride} from '../model/ride.model';
import {DatePipe, NgIf, Time} from '@angular/common';
import {getSeat, RideService} from '../service/ride.service';
import {MapComponent} from '../map/map.component';
import {UserService} from '../service/user.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Timestamp} from 'rxjs';

import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-driver-ride-view',
  standalone: true,
  imports: [
    DatePipe,
    MapComponent,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './driver-ride-view.component.html',
  styleUrl: './driver-ride-view.component.css'
})
export class DriverRideViewComponent implements OnInit {

  seeDriverDetail: boolean = false;
  driver!: Driver | undefined;
  @Input() selectedRide!: Ride;
  @Input() driverString!: string;
  @Output() stateChangeDriver: EventEmitter<boolean> = new EventEmitter<boolean>();

  isBooked: boolean = false;

  placeOfDeparture?: string;
  placeOfArrival?: string;
  availableSeats?: number;
  depatureTime?: Date;
  depatureTimeTwo?: Time;


  edit: FormGroup = new FormGroup({
    'placeOfDeparture': new FormControl(null, Validators.required),
    'placeOfArrival': new FormControl(null, Validators.required),
    'availableSeats': new FormControl(null, Validators.required),
    'depatureTime': new FormControl(null, Validators.required),
    'depatureTimeTwo': new FormControl(null, Validators.required)
  })

  toggleState() {
    this.seeDriverDetail=false;
    this.stateChangeDriver.emit(this.seeDriverDetail);


  }

  constructor(private userService: UserService,private rideService: RideService, private hardData: HardcodeService) {
  }

  /*async getDriverInfos() {
    console.log("im getDriverInfo")
    let username: string = this.selectedRide.driver;
    this.driver = await this.userService.getUserDetailsForRide(username);
    console.log("DEEES DRIVER:", this.driver);
  }*/

  async getDriverInfos() {
    console.log("im getDriverInfo");
    let username: string = this.selectedRide.driver;

    // Asynchroner Aufruf
    this.driver = await this.userService.getUserDetailsForRide(username);

    // Sicherstellen, dass die Ansicht aktualisiert wird
    //this.cdr.detectChanges();
    console.log("Driver details:", this.driver);
  }

  /*ngOnInit(): void {
    this.driver = this.hardData.hardcodedDriver.find(d => {return d.username == this.driverString})
    this.getDriverInfos();
    //this.selectedRide = this.hardData.hardcodedRide.find(d => {return d.driver == this.driverString})
  }*/

  async ngOnInit(): Promise<void> {
    this.driver = await this.userService.getUserDetailsForRide(this.driverString);

    this.getDriverInfos();

    this.edit.patchValue({
      placeOfDeparture: this.selectedRide?.placeOfDeparture,
      placeOfArrival: this.selectedRide?.placeOfArrival,
      departureTime: this.selectedRide?.departureTime,
      departureTimeTwo: this.selectedRide?.departureTime ? new Date(this.selectedRide?.departureTime).toISOString().slice(11, 16) : ''
    });
    //checkLoginStatus();

    /*if (this.selectedRide?.id && this.driver?.username) {
      this.checkBookingStatus(this.driver.username); // Nur aufrufen, wenn der 'username' vorhanden ist
    }*/
  }




  toggleBooking(ride: Ride) {
    //const storageKey = `isBooked_${ride.id}`;
    if (this.isBooked) {
      //sessionStorage.setItem(storageKey, 'false'); // Status speichern
      sessionStorage.setItem('storageKey', String(false));
      //console.log(storageKey+ " STORAGEKEY")
      this.unbookSeat(ride); // Abmelden

    } else {
      this.getSeat(ride); // Buchen
      sessionStorage.setItem('storageKey', String(true));
      //console.log(storageKey+ " STORAGEKEY")
    }
    console.log("is do")
  }

  getSeat(ride: Ride) {
    if (sessionStorage.getItem("isloged")) {
      this.rideService.getSeat(ride);
      alert("Ride reserved");
      this.isBooked = true; // Zustand auf 'gebucht' setzen
    } else {
      alert("Please log in to reserve a ride!");
    }
  }

  checkBookingStatus(rideId: string | undefined) {
    if (!rideId) {
      console.warn('Ride ID is undefined');
      return; // Verhindert die Ausführung, wenn der rideId undefined ist
    }

    const storageKey = `isBooked_${rideId}`;
    const status = localStorage.getItem(storageKey) === 'true';
    this.isBooked = status
  }

  unbookSeat(ride: Ride) {
    if (sessionStorage.getItem("isloged")) {
      this.rideService.unbookSeat(ride); // Beispiel-Funktion zum Stornieren
      alert("Ride cancelled");
      this.isBooked = false; // Zustand auf 'nicht gebucht' setzen
    } else {
      alert("Please log in to cancel a ride!");
    }
  }

  /*getSeat(ride: Ride){

    if(sessionStorage.getItem("isloged")){
      this.rideService.getSeat(ride)
      alert("ride reserve")
    } else {
      alert("Please log in to reserve a ride!")
    }
    window.location.reload();

  }

  /*editRide(ride: Ride) {
    let username: string = this.selectedRide.driver;
    console.log(username + "... das ist der user")

    console.log("edit ride")
    if(sessionStorage.getItem("isloged")&& username == sessionStorage.getItem("username")){
      //this.rideService.getSeat(ride)
      let username: string = this.selectedRide.driver;
      console.log(username + " eingeloggt richtig")

      alert("richtig")

    } else {
      alert("You only can edit your rides!")
    }
  }*/

  /*canEditRide(ride: Ride): boolean {
    const loggedInUsername = sessionStorage.getItem("username");
    console.log("Logged-in username:", loggedInUsername);
    console.log("Ride driver:", ride.driver);

    const isAuthorized = ride.driver === loggedInUsername;
    console.log("Authorization result:", isAuthorized);

    return isAuthorized;
  }*/


  editFunction() {
    this.placeOfDeparture=this.edit.get('placeOfDeparture')?.value;
    this.placeOfArrival=this.edit.get('placeOfArrival')?.value;
    this.availableSeats=this.edit.get('availableSeats')?.value;
    this.depatureTime=this.edit.get('depatureTime')?.value;
    this.depatureTimeTwo=this.edit.get('depatureTimeTwo')?.value;

  }

  protected readonly sessionStorage = sessionStorage;

  editButton() {
    console.log("kannst editen")
  }

  checkLoginStatus() {
    const loggedInUsername = sessionStorage.getItem("username"); // Benutzername aus sessionStorage
    /*if (loggedInUsername && this.driver?.username === loggedInUsername) {
      this.isLoggedInAsDriver = true; // Wenn der Fahrer und der eingeloggte Benutzer übereinstimmen
    } else {
      this.isLoggedInAsDriver = false; // Wenn sie nicht übereinstimmen
    }*/
  }
}
