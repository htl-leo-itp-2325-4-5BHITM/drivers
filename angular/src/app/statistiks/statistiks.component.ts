import {Component, OnInit} from '@angular/core';
import {RideService} from '../service/ride.service';
import {Router} from '@angular/router';
import {HardcodeService} from '../service/hardcode.service';
import {retry, Subscription} from 'rxjs';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-statistiks',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './statistiks.component.html',
  styleUrl: './statistiks.component.css'
})
export class StatistiksComponent implements OnInit{
  ridesCount: number | undefined;
  ridesCountBeenOn: number | undefined;
  private othersRides: number | undefined;

  constructor(private rideService: RideService, private router: Router, private hardCoded: HardcodeService) {
  }

  getRidesBeenOn():void {
    var user = sessionStorage.getItem("username")

    var count = this.rideService.getRidesBeenOn(user).subscribe((value) => {
      this.ridesCountBeenOn = Number(value)
    });
  }

  getRidesOthers():void {
    var user = sessionStorage.getItem("username")

    var count = this.rideService.getRidesOffered(user).subscribe((value) => {
      this.ridesCount = Number(value)
    });
  }
  ngOnInit(): void {
    this.getRidesOthers()
    this.getRidesBeenOn()
  }


}
