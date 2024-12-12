import {Component, OnDestroy, OnInit} from '@angular/core';
import {RideService} from '../service/ride.service';
import {Ride} from '../model/ride.model';
import {Subscription} from 'rxjs';
import {DriverRideViewComponent} from '../driver-ride-view/driver-ride-view.component';
import {MapAllComponent} from '../map-all/map-all.component';
import {FilterComponent} from '../filter/filter.component';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-ride-view',
  standalone: true,
  templateUrl: './ride-view.component.html',
  imports: [
    DriverRideViewComponent,
    MapAllComponent,
    FilterComponent,
    DatePipe,
    NgClass,
    NavbarComponent,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./ride-view.component.css']
})
export class RideViewComponent implements OnInit, OnDestroy {
  rides: Ride[] = [];  // This will now store either all rides or the filtered rides
  ridesSubscription: Subscription = <Subscription>{};
  showDriver: boolean = false;
  showFilter: boolean = false;

  // Add selectedRide here to store the clicked ride
  selectedRide: Ride = <Ride>{};  // This will hold the currently selected ride

  driver: string = '';  // To display the driver of the selected ride

  constructor(private rideService: RideService) {}

  ngOnInit() {
    // Initially load all rides
    this.ridesSubscription = this.rideService.getRides().subscribe((rides) => {
      this.rides = rides;
      console.log('All Rides:', this.rides);
    });
  }

  ngOnDestroy() {
    this.ridesSubscription.unsubscribe();
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
}
