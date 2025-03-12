import { Component, OnInit } from '@angular/core';
import { RideService } from '../service/ride.service';
import { Router } from '@angular/router';
import { HardcodeService } from '../service/hardcode.service';
import { Chart, registerables } from 'chart.js';
import { StarsData } from '../model/starsData';
import {NavbarComponent} from '../navbar/navbar.component';
import {NgStyle} from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiks',
  standalone: true,
  imports: [
    NavbarComponent,
    NgStyle
  ],
  templateUrl: './statistiks.component.html',
  styleUrls: ['./statistiks.component.css']
})
export class StatistiksComponent implements OnInit {
  ridesCount: number = 0;
  ridesCountBeenOn: number = 0;
  chartdata: StarsData[] = [];
  labeldata: number[] = [];
  realdata: number[] = [];
  colordata: any[] = [];
  chart: Chart | undefined; // Falls du das Chart später referenzieren möchtest
  totalRides: number | undefined;

  constructor(private rideService: RideService, private router: Router, private hardCoded: HardcodeService) { }

  ngOnInit(): void {
    this.getRidesOthers();
    this.getRidesBeenOn();
    //this.getTotalRides();
    this.loadChartData();
  }

  getRidesBeenOn(): void {
    const user = sessionStorage.getItem("username");
    if(user) {
      this.rideService.getRidesBeenOn(user).subscribe((value) => {
        this.ridesCountBeenOn = Number(value);
        this.getTotalRides();
      });
    }

  }

  getRidesOthers(): void {
    const user = sessionStorage.getItem("username");
    if(user) {
      this.rideService.getRidesOffered(user).subscribe((value) => {
        this.ridesCount = Number(value);
        this.getTotalRides();
      });
    }
  }

  getTotalRides(): void{
    const user = sessionStorage.getItem("username");
    let temp:number;
    let temp2: number;
    if(user) {
      this.rideService.getRidesOffered(user).subscribe((value) => {
        temp = Number(value);
      });
      this.rideService.getRidesBeenOn(user).subscribe((value) => {
        temp2 = Number(value)
      })
    }
    this.totalRides=this.ridesCountBeenOn+this.ridesCount;
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
    console.log("bin daaaaaa:", this.realdata, " aaaand ", this.labeldata, " aaaand ", this.colordata);

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
            label: 'stars',
            data: this.realdata,
            backgroundColor: this.colordata
          }]
        },
        options: {
          indexAxis: "x",
          plugins: {
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,   // Zeige den Titel der x-Achse
                text: 'Sterne'   // Beschriftung für die x-Achse
              },
              grid: {
                display: false  // Remove grid lines on the x-axis
              }
            },
            y: {
              beginAtZero: true, // Falls du willst, dass die y-Achse bei 0 beginnt
              title: {
                display: true,   // Zeige den Titel der y-Achse
                text: 'Erhaltene Sterne'  // Beschriftung für die y-Achse
              },
              ticks: {
                stepSize: 1, // Nur ganze Zahlen
              },
              grid: {
                display: false  // Remove grid lines on the y-axis
              }
            }
          }
        }
      });
    } else {
      console.error("Canvas element with id 'barchart' not found");
    }
  }




  get ridesPercentageBeenOn(): string {

    let number= this.ridesCount && this.ridesCountBeenOn
      ? ((this.ridesCountBeenOn/ (this.ridesCountBeenOn  + this.ridesCount) ) * 100).toFixed(2)
      : '0';

    console.log("this is number: " + number)
    return number;
  }

  get ridesPercentageOffered(): string {
    let number= this.ridesCount && this.ridesCountBeenOn
      ? ((this.ridesCount/ (this.ridesCountBeenOn  + this.ridesCount) ) * 100).toFixed(2)
      : '0';

    console.log("this is number: " + number)
    return number;
  }
}
