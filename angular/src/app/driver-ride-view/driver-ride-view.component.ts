import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver, HardcodeService} from '../service/hardcode.service';
import {Ride} from '../model/ride.model';
import {DatePipe} from '@angular/common';
import {RideService} from '../service/ride.service';

@Component({
  selector: 'app-driver-ride-view',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './driver-ride-view.component.html',
  styleUrl: './driver-ride-view.component.css'
})
export class DriverRideViewComponent implements OnInit {

  seeDriverDetail: boolean = false;
  driver!: Driver | undefined;
  selectedRide!: Ride | undefined;
  @Input() driverString!: string;
  @Output() stateChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  toggleState() {
    this.seeDriverDetail=false;
    this.stateChange.emit(this.seeDriverDetail);
  }

  constructor(private hardData: HardcodeService,) {

  }

  ngOnInit(): void {
    this.driver = this.hardData.hardcodedDriver.find(d => {return d.username == this.driverString})
    this.selectedRide = this.hardData.hardcodedRide.find(d => {return d.driver == this.driverString})
  }


}
