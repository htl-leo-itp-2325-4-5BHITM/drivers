import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf, Time} from '@angular/common';
import {User} from '../model/user.model';
import {Filter} from '../model/filter.model';
import {DateTime} from 'luxon';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {RideService} from '../service/ride.service';
import {RideViewComponent} from '../ride-view/ride-view.component';
import {Ride} from '../model/ride.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RideViewComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  seeFilters: boolean=false;
  seeRides: boolean=false;
  @Output() stateChangeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  from:string=""
  to:string=""
  date: Date = new Date();
  time: Date = new Date();
  showOwnRides:boolean=false;

  filteredRides :Subscription = <Subscription>{};

  constructor(private rideService: RideService, private router: Router) {
  }

  filterOption: FormGroup = new FormGroup({
    'from': new FormControl(''),
    'to': new FormControl(''),
    'date': new FormControl(''),
    'time': new FormControl(''),
    'showOwnRides': new FormControl(false)
  })

  filterFunction() {
    this.from=this.filterOption.get('from')?.value;
    this.to=this.filterOption.get('to')?.value;
    this.date=this.filterOption.get('date')?.value;
    this.time=this.filterOption.get('time')?.value;

    console.log(this.from, this.to, this.date, this.time)

    const combinedDateTime = DateTime.fromFormat(
      `${this.date} ${this.time}`,
      'yyyy-MM-dd HH:mm'
    );

    let filter :Filter = <Filter>{};

    if (this.from != null) {
      filter.placeOfDeparture = this.from;
    }
    if (this.to != null) {
      filter.placeOfArrival = this.to;
    }

    filter.departureTime = combinedDateTime;


    this.filteredRides = this.rideService.filterRides(filter);
    console.log(this.filteredRides)

    /*this.rideService.filterRides(filter).subscribe((value) => {
      this.filteredRides = value;
      console.log(this.filteredRides);
    })*/


    this.showOwnRides=this.filterOption.get('showOwnRides')?.value;
  }

  toggleState() {
    this.seeFilters=false;
    this.stateChangeFilter.emit(this.seeFilters);
    this.seeRides=true
    this.router.navigate(['/rides'])
  }
}
