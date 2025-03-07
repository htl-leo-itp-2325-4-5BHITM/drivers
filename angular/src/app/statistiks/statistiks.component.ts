import { Component, OnInit } from '@angular/core';
import { RideService } from '../service/ride.service';
import { Router } from '@angular/router';
import { HardcodeService } from '../service/hardcode.service';
import { Chart, registerables } from 'chart.js';
import { StarsData } from '../model/starsData';
import {NavbarComponent} from '../navbar/navbar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiks',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './statistiks.component.html',
  styleUrls: ['./statistiks.component.css']
})
export class StatistiksComponent implements OnInit {
  ridesCount: number | undefined;
  ridesCountBeenOn: number | undefined;
  chartdata: StarsData[] = [];
  labeldata: number[] = [];
  realdata: number[] = [];
  colordata: any[] = [];
  chart: Chart | undefined; // Falls du das Chart später referenzieren möchtest

  constructor(private rideService: RideService, private router: Router, private hardCoded: HardcodeService) { }

  ngOnInit(): void {
    this.getRidesOthers();
    this.getRidesBeenOn();
    this.loadChartData();
  }

  getRidesBeenOn(): void {
    const user = sessionStorage.getItem("username");
    if(user) {
      this.rideService.getRidesBeenOn(user).subscribe((value) => {
        this.ridesCountBeenOn = Number(value);
      });
    }
  }

  getRidesOthers(): void {
    const user = sessionStorage.getItem("username");
    if(user) {
      this.rideService.getRidesOffered(user).subscribe((value) => {
        this.ridesCount = Number(value);
      });
    }
  }

  loadChartData(): void {
    console.log("bin daaaaaa");
    const user = sessionStorage.getItem("username");
    if (user) {
      this.rideService.getStarsData(user).subscribe({
        next: (value) => {
          this.chartdata = value;
          this.labeldata = [];
          this.realdata = [];
          this.colordata = [];

          if (this.chartdata != null) {
            console.log("chartdata is not null: ", this.chartdata);
            this.chartdata.forEach(o => {
              this.labeldata.push(o.stars);
              this.realdata.push(o.amount);
              this.colordata.push(o.colorcode);
            });
          }
          this.renderChart();
        },
        error: (error) => {
          console.error("Error loading chart data", error);
        }
      });
    }
  }


  renderChart(): void {
    // Stelle sicher, dass das Canvas-Element existiert
    console.log("bin daaaaaa:",this.realdata," aaaand ",this.labeldata," aaaand ",this.colordata)

    const canvas = document.getElementById('barchart') as HTMLCanvasElement;
    if (canvas) {
      // Falls bereits ein Chart existiert, zerstöre ihn vorher
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.labeldata,
          datasets: [{
            data: this.realdata,
            backgroundColor: this.colordata
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      console.error("Canvas element with id 'barchart' not found");
    }
  }
}
