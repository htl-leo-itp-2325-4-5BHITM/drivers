import {Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import {Ride} from '../model/ride.model';
import {latLng, MapOptions, marker} from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map?: L.Map;
  @Input() ride: Ride = <Ride>{};

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    if (this.ride.placeOfDepartureCoordinate != null && this.ride.placeOfArrivalCoordinate != null) {
      var depCo = this.ride.placeOfDepartureCoordinate.split(',');
      var deplatlng = L.latLng(parseFloat(depCo[0]), parseFloat(depCo[1]));
      console.log(deplatlng)

      var arrCo = this.ride.placeOfArrivalCoordinate.split(',');
      var arrlatlng = L.latLng(parseFloat(arrCo[0]), parseFloat(arrCo[1]));


      this.map = L.map('map', {
        center: latLng((deplatlng.lat + arrlatlng.lat) / 2, (deplatlng.lng + arrlatlng.lng) / 2),
        zoom: 8
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        crossOrigin: true
      });
      marker(deplatlng).addTo(this.map);
      marker(arrlatlng).addTo(this.map);
      tiles.addTo(this.map);
    }
  }
}
