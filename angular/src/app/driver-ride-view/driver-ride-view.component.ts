import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {Ride} from '../model/ride.model';
import {DatePipe, formatDate, NgIf, Time} from '@angular/common';
import {getSeat, RideService} from '../service/ride.service';
import {MapComponent} from '../map/map.component';
import {UserService} from '../service/user.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Timestamp} from 'rxjs';

import {RouterLink} from '@angular/router';
import {DateTime} from 'luxon';


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
  abfortC?: string;
  ankortC?: number;


  edit: FormGroup = new FormGroup({
    'placeOfDeparture': new FormControl(null),
    'placeOfDepartureC': new FormControl(null),
    'placeOfArrival': new FormControl(null),
    'placeOfArrivalC': new FormControl(null),
    'availableSeats': new FormControl(null),
    'departureTime': new FormControl(null),
    'departureTimeTwo': new FormControl(null)
  })

  toggleState() {
    this.seeDriverDetail=false;
    this.stateChangeDriver.emit(this.seeDriverDetail);


  }

  constructor(private userService: UserService,private rideService: RideService, private hardData: HardcodeService) {
    //this.isBooked = this.setIsBooked()
  }

  async getDriverInfos() {
    console.log("im getDriverInfo");
    let username: string = this.selectedRide.driver;

    // Asynchroner Aufruf
    this.driver = await this.userService.getUserDetailsForRide(username);

    // Sicherstellen, dass die Ansicht aktualisiert wird
    //this.cdr.detectChanges();
    console.log("Driver details:", this.driver);
  }

  async ngOnInit(): Promise<void> {
    this.driver = await this.userService.getUserDetailsForRide(this.driverString);

    const canEdit = this.canEditRide(this.selectedRide);

    this.getDriverInfos();

    this.edit.patchValue({
      placeOfDeparture: this.selectedRide?.placeOfDeparture,
      placeOfArrival: this.selectedRide?.placeOfArrival,
      //departureTime: this.selectedRide?.departureTime,
      //departureTimeTwo: this.selectedRide?.departureTime ? new Date(this.selectedRide?.departureTime).toISOString().slice(11, 16) : ''
      departureTime: [this.selectedRide?.departureTime ? formatDate(this.selectedRide.departureTime, 'yyyy-MM-dd', 'en') : ''],
     // departureTimeTwo: [this.selectedRide?.departureTime ? formatDate(this.selectedRide.departureTime, 'HH:mm', 'en') : '']
     // departureTimeTwo: [this.selectedRide?.departureTime ? formatDate(this.selectedRide.departureTime, 'HH:mm', 'en') : '']

    });

    this.edit.get('departureTime')?.disable();
    if (this.canEditRide(this.selectedRide)) {
      this.edit.get('departureTime')?.enable();
    }

    if (!this.canEditRide(this.selectedRide)) {
      Object.keys(this.edit.controls).forEach(controlName => {
        this.edit.get(controlName)?.disable();
      });
    }
  }

  setIsBooked() {
    let isBookedB = false;
    let username = sessionStorage.getItem("username")
    if(username === null) {
      username = "false"
    }
    let id =1
    console.log(this.selectedRide?.departureTime)
    this.rideService.isSeatBooked(id, username).subscribe({
      next: (isBooked) => {
        console.log('Seat booking status before toggle:', isBooked);
        isBookedB = isBooked === 1;
      },
      error: (error) => {
        console.error('Error checking booking status:', error);
      },
    });
    return isBookedB
  }

  toggleBooking(ride: Ride): void {
    const isLogged = Boolean(sessionStorage.getItem('isloged') === 'true'); // Überprüfung der Anmeldung

    if (!isLogged) {
      alert('Bitte melden Sie sich an, um eine Buchung vorzunehmen.');
      return;
    }

    const username = sessionStorage.getItem('username'); // Username aus dem Local Storage
    if (!username) {
      alert('Benutzername fehlt. Bitte erneut anmelden.');
      return;
    }

    // Überprüfen, ob der Sitz bereits gebucht ist
    this.rideService.isSeatBooked(ride.id, username).subscribe((bookedSeats) => {
      if (bookedSeats > 0) {
        // Wenn der Sitz bereits gebucht ist, stornieren
        this.isBooked = false;
        sessionStorage.setItem("isBooked",String(this.isBooked))
        alert('Sitz wurde erfolgreich storniert.');
      } else {
        // Wenn der Sitz noch nicht gebucht ist, buchen
        this.isBooked = true;
        sessionStorage.setItem("isBooked",String(this.isBooked))
        alert('Sitz wurde erfolgreich gebucht.');
      }
    });
  }


  /*toggleBooking(ride: Ride) {
     const username = sessionStorage.getItem('username');
     const checkIfIsLoggedIn: boolean = sessionStorage.getItem("isLoged") === "true";

     if (checkIfIsLoggedIn == false) {
       alert('Please log in to reserve or cancel a ride!');
       return;
     }

     // Das Payload-Objekt wird hier erstellt
     const payload = { rideId: ride.id, username: username };

     // Debugging-Ausgabe, um sicherzustellen, dass die Daten korrekt sind
     console.log('Payload:', payload);

     this.rideService.isSeatBooked(ride.id, username).subscribe({
       next: (isBooked) => {
         console.log('Rückgabewert von isSeatBooked:', isBooked);
         if (isBooked == 1) { // ggf. === verwenden
           console.log("unbook seat...")
           this.unbookSeat(ride); // Bereits gebucht, also stornieren
         } else {
           this.getSeat(ride); // Nicht gebucht, also buchen
         }
       },
       error: (error) => {
         console.error('Fehler beim Abrufen des Buchungsstatus:', error);
       }
     });

   }*/

  /*getSeat(ride: Ride) {
    if (sessionStorage.getItem("isloged")) {
      this.rideService.getSeat(ride);
      alert("Ride reserved");
      this.isBooked = true; // Zustand auf 'gebucht' setzen
    } else {
      alert("Please log in to reserve a ride!");
    }
  }*/

  checkBookingStatus(rideId: string | undefined) {
    if (!rideId) {
      console.warn('Ride ID is undefined');
      return; // Verhindert die Ausführung, wenn der rideId undefined ist
    }

    const storageKey = `isBooked_${rideId}`;
    const status = localStorage.getItem(storageKey) === 'true';
    this.isBooked = status
  }

  private mergeDateAndTime(date: string, time: string): string {
    return `${date}T${time}:00.000Z`; // Falls UTC benötigt wird
  }


  /*unbookSeat(ride: Ride) {
    //console.log(sessionStorage.getItem("isloged"),"adfasdfasdf")
    const checkIfIsLoggedIn: boolean = sessionStorage.getItem("isLoged") === "true";

    console.log(checkIfIsLoggedIn,"adfasdfasdf")

    if (checkIfIsLoggedIn) {
      this.rideService.unbookSeat(ride); // Beispiel-Funktion zum Stornieren
      alert("Ride cancelled");
      //localStorage.setItem('isloged', String(false))
      this.isBooked = false; // Zustand auf 'nicht gebucht' setzen
    } /*else {
      alert("Please log in to cancel a ride!");
    }*/
  //}

  editRide(ride: Ride) {
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
  }

  canEditRide(ride: Ride): boolean {
    const loggedInUsername = sessionStorage.getItem("username");
    const isLoggedIn = sessionStorage.getItem("isloged") === "true";
    return isLoggedIn && loggedInUsername === ride.driver;
  }


  editFunction() {
    this.placeOfDeparture=this.edit.get('placeOfDeparture')?.value;
    this.placeOfArrival=this.edit.get('placeOfArrival')?.value;
    this.availableSeats=this.edit.get('availableSeats')?.value;
    this.depatureTime=this.edit.get('depatureTime')?.value;
    this.depatureTimeTwo=this.edit.get('depatureTimeTwo')?.value;
    this.abfortC=this.edit.get('abfortC')?.value;
    this.ankortC=this.edit.get('ankortC')?.value;

    console.log(this.placeOfDeparture, this.placeOfArrival, this.availableSeats, this.depatureTime, this.depatureTimeTwo)
  }

  editButton() {

    const combinedDateTime = DateTime.fromFormat(
      `${this.edit.get('departureTime')?.value} ${this.edit.get('departureTimeTwo')?.value}`,
      'yyyy-MM-dd HH:mm'
    );

    console.log("date: ",this.edit.get('departureTimeTwo')?.value)

    const updatedRide = {
      id: this.selectedRide.id,
      departureTime: combinedDateTime,
      placeOfDeparture: this.edit.get('placeOfDeparture')?.value,
      placeOfArrival: this.edit.get('placeOfArrival')?.value,
      availableSeats: this.edit.get('availableSeats')?.value,
      driver: this.driver?.username,
      abfortC: this.edit.get('abfortC')?.value,
      ankortC: this.edit.get('ankortC')?.value,
    };

    console.log("Updated Ride Data:", updatedRide);

    this.rideService.updateRide(updatedRide).subscribe({
      next: (response) => {
        console.log('Ride updated successfully:', response);
        alert('Ride updated successfully!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error updating ride:', err);
        alert('Failed to update the ride. Please try again.');
      },
    });
  }

}
