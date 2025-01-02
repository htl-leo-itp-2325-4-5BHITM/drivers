import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {Ride} from '../model/ride.model';
import {NgIf} from '@angular/common';
import {latLng} from 'leaflet';


@Component({
  selector: 'app-map-all',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './map-all.component.html',
  styleUrl: './map-all.component.css'
})
export class MapAllComponent implements OnInit{
  @Input() ride: Ride = <Ride>{};
  center :string = ""
  depC :string = ""
  arrC :string = ""
  minLat :string = ""
  minLon :string = ""
  maxLat :string = ""
  maxLon :string = ""


  constructor() {
    this.center = this.setCenter();
  }

  setCenter() {
    if (this.ride.placeOfDepartureCoordinate != null && this.ride.placeOfArrivalCoordinate != null) {

      const parseCoordinates = (coord: string): { x: number, y: number } => {
        const match = coord.match(/-?\d+(\.\d+)?/g); // Finde Zahlen mit optionalem Minus und Dezimalstellen
        if (!match || match.length < 2) {
          throw new Error(`Ungültiges Koordinatenformat: ${coord}`);
        }
        return { x: parseFloat(match[0]), y: parseFloat(match[1]) };
      };

      // Konvertiere die Strings in Zahlenpaare
      const point1 = parseCoordinates(this.ride.placeOfDepartureCoordinate);
      const point2 = parseCoordinates(this.ride.placeOfArrivalCoordinate);

      // Berechne den Mittelpunkt
      const midpoint = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2
      };

      // Formatiere den Mittelpunkt als String
      return `${midpoint.y},${midpoint.x}`;
    }
    return ""
  }

  swapCoordinates(coord: string): string {
    // Extrahiere die Koordinaten aus dem String
    const parseCoordinates = (coord: string): { x: number, y: number } => {
      const match = coord.match(/-?\d+(\.\d+)?/g); // Finde Zahlen mit optionalem Minus und Dezimalstellen
      if (!match || match.length < 2) {
        throw new Error(`Ungültiges Koordinatenformat: ${coord}`);
      }
      return { x: parseFloat(match[0]), y: parseFloat(match[1]) };
    };

    // Konvertiere den String in ein Zahlenpaar
    const point = parseCoordinates(coord);

    // Tausche x und y
    const swapped = { x: point.y, y: point.x };

    // Formatiere das Ergebnis als String
    return `${swapped.x},${swapped.y}`;
  }

  ngOnInit(): void {
    //console.log(this.ride.placeOfDepartureCoordinate)
    this.center = this.setCenter()
    //console.log(this.center)
    if(this.ride.placeOfDepartureCoordinate != null && this.ride.placeOfArrivalCoordinate != null) {
      this.depC = this.swapCoordinates(this.ride.placeOfDepartureCoordinate);
      this.arrC = this.swapCoordinates(this.ride.placeOfArrivalCoordinate);

      this.getZoom(this.arrC,this.depC)
    }
    //console.log(this.arrC, this.depC)

  }

  private getZoom(arrC: string, depC: string) {
    const coordinates = [
      arrC,
      depC
    ];

    const parsedCoords = coordinates.map(coord => {
      const [lon, lat] = coord.split(',').map(Number);
      return { lon, lat };
    });

    this.minLon = String(Math.min(...parsedCoords.map(coord => coord.lon)));
    this.minLat = String(Math.min(...parsedCoords.map(coord => coord.lat)));
    this.maxLon = String(Math.max(...parsedCoords.map(coord => coord.lon)));
    this.maxLat = String(Math.max(...parsedCoords.map(coord => coord.lat)));

  }
}
