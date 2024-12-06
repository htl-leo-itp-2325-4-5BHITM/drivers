import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {Ride} from '../model/ride.model';
import {DatePipe} from '@angular/common';
import {getSeat, RideService} from '../service/ride.service';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-driver-ride-view',
  standalone: true,
  imports: [
    DatePipe,
    MapComponent
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


  toggleState() {
    this.seeDriverDetail=false;
    this.stateChangeDriver.emit(this.seeDriverDetail);
  }

  constructor(private rideService: RideService, private hardData: HardcodeService) {

  }

  ngOnInit(): void {
    this.driver = this.hardData.hardcodedDriver.find(d => {return d.username == this.driverString})
    //this.selectedRide = this.hardData.hardcodedRide.find(d => {return d.driver == this.driverString})
  }


  getSeat(ride: Ride){

    if(sessionStorage.getItem("isloged")){
      this.rideService.getSeat(ride)
      alert("ride reserve")
    } else {
      alert("Please log in to reserve a ride!")
    }


  }
}