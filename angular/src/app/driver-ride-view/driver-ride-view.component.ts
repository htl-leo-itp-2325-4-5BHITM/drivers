import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {Ride, RateRide} from '../model/ride.model';
import {DatePipe, formatDate, NgForOf, NgIf, NgStyle, Time} from '@angular/common';
import {getSeat, RideService} from '../service/ride.service';
import {MapComponent} from '../map/map.component';
import {UserService} from '../service/user.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription, Timestamp} from 'rxjs';

import {RouterLink} from '@angular/router';
import {DateTime} from 'luxon';
import {User} from '../model/user.model';
import {Passanger} from '../model/passanger.model';


@Component({
  selector: 'app-driver-ride-view',
  standalone: true,
  imports: [
    DatePipe,
    MapComponent,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgForOf,
    FormsModule,
    NgStyle
  ],
  templateUrl: './driver-ride-view.component.html',
  styleUrl: './driver-ride-view.component.css'
})
export class DriverRideViewComponent implements OnInit {
  passengers: Passanger[] = [];
  passengerSubscription: Subscription = <Subscription>{};
  seeDriverDetail: boolean = false;
  driver!: Driver | undefined;
  @Input() selectedRide!: Ride;
  @Input() driverString!: string;
  @Input() category!: string;
  @Output() stateChangeDriver: EventEmitter<boolean> = new EventEmitter<boolean>();

  isBooked: boolean = false;
  seatIsBooked = false;
  checkSeatFree: boolean = false;


  placeOfDeparture?: string;
  placeOfArrival?: string;
  availableSeats?: number;
  depatureTime?: Date;
  depatureTimeTwo?: Time;
  abfortC?: string;
  ankortC?: number;
  selectedPassenger?: User;
  hasPassengerSelected=false;


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

  async getPassengers() {
    let id = this.selectedRide.id;

    // Asynchroner Aufruf
    this.passengerSubscription = (await this.userService.getPassengers(id)).subscribe((passengers) => {
      this.passengers = passengers;
      console.log('passengers:', this.passengers);
    });

    // Sicherstellen, dass die Ansicht aktualisiert wird
    //this.cdr.detectChanges();
    console.log("Passengers", this.passengers);
  }

  async ngOnInit(): Promise<void> {
    this.driver = await this.userService.getUserDetailsForRide(this.driverString);

    const canEdit = this.canEditRide(this.selectedRide);
    this.getDriverInfos();
    this.getPassengers();

    const savedBookingStatus = sessionStorage.getItem("seatIsBooked");
    //this.seatIsBooked = savedBookingStatus === 'true'; // Status wiederherstellen

    this.edit.patchValue({
      placeOfDeparture: this.selectedRide?.placeOfDeparture,
      placeOfArrival: this.selectedRide?.placeOfArrival,
      departureTime: [this.selectedRide?.departureTime ? formatDate(this.selectedRide.departureTime, 'yyyy-MM-dd', 'en') : ''],
      departureTimeTwo: this.selectedRide?.departureTime ? formatDate(this.selectedRide.departureTime, 'HH:mm', 'en') : ''
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


    /*this.checkSeatFree = this.canBookRide(this.selectedRide)
    if(this.checkSeatFree){
      this.seatIsBooked = true
    }else{
      this.seatIsBooked = false
    }
    console.log(this.seatIsBooked)*/

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
      alert('LogIn to book a seat!');
      return;
    }

    const username = sessionStorage.getItem('username'); // Username aus dem Local Storage
    if (!username) {
      alert('Username is missing');
      return;
    }

    // Überprüfen, ob der Sitz bereits gebucht ist
    this.rideService.isSeatBooked(ride.id, username).subscribe((bookedSeats) => {
      console.log("this ride", ride)
      if ( this.seatIsBooked) {
        console.log("seat booked ", ride)
      //if(bookedSeats == 0){
        // Wenn der Sitz bereits gebucht ist, stornieren
        this.seatIsBooked = false;
        //sessionStorage.setItem("seatIsBooked",String(this.seatIsBooked))
        this.rideService.unbookSeat(ride);
        console.log(this.seatIsBooked)
        alert('Sitz wurde erfolgreich storniert.');
      } else {
        console.log("seat unbooked ", ride)
        // Wenn der Sitz noch nicht gebucht ist, buchen
        this.seatIsBooked = true;
        //sessionStorage.setItem("seatIsBooked",String(this.seatIsBooked))
        this.rideService.getSeat(ride);
        console.log(this.seatIsBooked)
        alert('Sitz wurde erfolgreich gebucht.');
      }
      window.location.reload();
      //console.log(bookedSeats)
    });
  }

  canBookRide(ride: Ride): boolean {
    const loggedInUsername = sessionStorage.getItem("username");
    const isLoggedIn = sessionStorage.getItem("isloged") === "true";
    return isLoggedIn && loggedInUsername === ride.driver;
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

  private mergeDateAndTime(date: string, time: string): string {
    return `${date}T${time}:00.000Z`; // Falls UTC benötigt wird
  }

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

  deleteRide(selectedRide: Ride) {
    this.rideService.deleteRide(selectedRide.id).subscribe({
      next: (response) => {
        console.log('Ride deleted succ:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error updating ride:', err);
        //alert('Failed to delete the ride. Please try again.');
        window.location.reload();
      },
    });
  }

  rateRide(selectedRide: Ride) {
    let newRating :RateRide = <RateRide>{}
    newRating.id = selectedRide.id;
    newRating.stars = this.stars;
    this.rideService.rateRide(newRating).subscribe({
      next: (response) => {
        console.log('Rating successfully');
        this.stars = 0;
        alert('Ride has been rated!');
        window.location.reload()
      },
      error: (err) => {
        console.error('Error rating ride:', err);
        alert('Failed to rate ride. Please try again.');
      },
    });
  }

  stars = 0
  unbookBool = true;

  selectedRating: number = -1; // Initialisiert auf -1, sodass keine Sterne standardmäßig gelb sind.

  clickRate(i: number): void {
    this.selectedRating = i; // Setzt die ausgewählte Bewertung auf den geklickten Stern.
    this.stars = i+1;
  }

  unbook(selectedRide: Ride) {
    if(this.unbookBool) {
      this.rideService.unbookSeat(selectedRide);
      this.unbookBool = false;
      alert('Sitz wurde erfolgreich storniert.');
      window.location.reload();
    }
    else {
      this.rideService.getSeat(selectedRide);
      this.unbookBool = true;
      alert('Sitz wurde erfolgreich gebucht.');
    }
    window.location.reload()
  }
}
const getTimeFromDate = (date: Date): string => {
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${hours}:${minutes}`;
};
