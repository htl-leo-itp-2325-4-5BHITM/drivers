import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {filter, Subscription} from 'rxjs';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
import {MapAllComponent} from '../map-all/map-all.component';
import {FilterComponent} from '../filter/filter.component';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {DateTime} from 'luxon';
import {Filter} from '../model/filter.model';
import {HardcodeService} from '../service/hardcode.service';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  templateUrl: './ride-view.component.html',
  imports: [
    DriverRideViewComponent,
    MapAllComponent,
    DatePipe,
    NgClass,
    NavbarComponent,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./ride-view.component.css']
})
export class RideViewComponent implements OnInit, OnDestroy {
  rides: Ride[] = [];  // This will now store either all rides or the filtered rides
  ridesSubscription: Subscription = <Subscription>{};
  showDriver: boolean = false;
  showFilter: boolean = false;
  ridesCategory :string = 'available'

  // Add selectedRide here to store the clicked ride
  selectedRide: Ride = <Ride>{};  // This will hold the currently selected ride

  driver: string = '';  // To display the driver of the selected ride

  constructor(private rideService: RideService, private router: Router, private hardCoded: HardcodeService) {
    this.rides = this.hardCoded.hardcodedRide;
  }

  ngOnInit() {
    // Initially load all rides
    this.ridesSubscription = this.rideService.getRides("available").subscribe((rides) => {
      this.rides = rides;
      console.log('All Rides:', this.rides);
    });
    if(this.ridesCategory == 'offered') {
      this.showDriver = false;
    }
  }

  ngOnDestroy() {
    this.ridesSubscription.unsubscribe();
  }

  getRidesPerButton(category: string) {
    this.ridesCategory = category;
    this.ridesSubscription = this.rideService.getRides(category).subscribe((rides) => {
      this.rides = rides;
      console.log('All Rides:', this.rides);
    });
  }

  // This method will be called when the filter is applied and filtered rides are emitted
  onFilteredRidesReceived(filteredRides: Ride[]) {
    this.rides = filteredRides;  // Update the rides with filtered rides
    console.log('Received Filtered Rides:', this.rides);
  }

  // Method to handle when a ride is clicked
  onRideClick(ride: Ride) {
    this.selectedRide = ride;  // Set the clicked ride as selectedRide
    this.driver = ride.driver;  // Set the driver to display in the detail view
    this.showDriver = true;  // Show driver details
  }

  // To toggle driver state
  onStateChangeDriver(newState: boolean) {
    this.showDriver = newState;
  }

  onStateChangeFilter(newState: boolean) {
    this.showFilter = newState;
  }

  // FILTER TEIL:
  seeFilters: boolean = false;
  seeRides: boolean = false;
  @Output() stateChangeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  from: string = ""
  to: string = ""
  date: Date = new Date();
  time: Date = new Date();
  showOwnRides: boolean = false;

  filteredRides: Ride[] = [];

  filterOption: FormGroup = new FormGroup({
    'from': new FormControl(''),
    'to': new FormControl(''),
    'date': new FormControl(''),
    'time': new FormControl(''),
    'showOwnRides': new FormControl(false)
  })

  filterFunction() {
    this.from = this.filterOption.get('from')?.value;
    this.to = this.filterOption.get('to')?.value;
    this.date = this.filterOption.get('date')?.value;
    this.time = this.filterOption.get('time')?.value;

    console.log(this.from, this.to, this.date, this.time)

    const combinedDateTime = DateTime.fromFormat(
      `${this.date} ${this.time}`,
      'yyyy-MM-dd HH:mm'
    );

    let filter: Filter = <Filter>{};

    if (this.from != null) {
      filter.placeOfDeparture = this.from;
    }
    if (this.to != null) {
      filter.placeOfArrival = this.to;
    }

    filter.departureTime = combinedDateTime;

    this.rideService.filterRides(filter).subscribe((value) => {
      this.filteredRides = value;
      //console.log("filtered rides "+this.filteredRides);
      this.rides = value;
      console.log(this.rides)
    })

    this.showOwnRides = this.filterOption.get('showOwnRides')?.value;
  }

  toggleState() {
    this.seeFilters = false;
    //this.showFilter=false;
    this.stateChangeFilter.emit(this.seeFilters);
    this.seeRides = true
    this.router.navigate(['/rides'])
  }

  clearFilters() {
    this.filterOption.reset()
    this.showFilter = false;
    this.ridesSubscription = this.rideService.getRides("available").subscribe((rides) => {
      this.rides = rides;
      console.log('All Rides:', this.rides);
    });
  }

  protected readonly sessionStorage = sessionStorage;
  showPastRides = false;
  showPastRidesText = "Show History"

  changeBookedRides() {
    this.showPastRides = !this.showPastRides;
    if(this.showPastRides) {
      this.showPastRidesText = "Show Upcoming"
      this.getRidesPerButton("ranking")
    }
    else {
      this.showPastRidesText = "Show History"
      this.getRidesPerButton("booked")
    }
  }
}
