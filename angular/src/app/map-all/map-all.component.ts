import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
//import leafletImage from 'leaflet-image';
import {Ride} from '../model/ride.model';
import {NgIf} from '@angular/common';
import {View, Map} from 'ol';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';


@Component({
  selector: 'app-map-all',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './map-all.component.html',
  styleUrl: './map-all.component.css'
})
export class MapAllComponent implements AfterViewInit{
  //private map?: L.Map;
  @Input() ride: Ride = <Ride>{};

  constructor() {
  }

  mapImage: string | null = null;
  private map!: Map;

  ngAfterViewInit(): void {
    // Erstelle eine Karte ohne DOM-Element
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });


    // Render Map auf Canvas
    const mapCanvas = document.createElement('canvas');
    const mapContext = mapCanvas.getContext('2d');
    if (!mapContext) return;



    const size = [800, 400]; // Bildgröße definieren
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];

    map.setSize(size);
    map.renderSync();

    Array.from(document.querySelectorAll('.ol-layer canvas')).forEach((canvas) => {
      const typedCanvas = canvas as HTMLCanvasElement; // Typanpassung
      const { width, height } = typedCanvas; // Jetzt kennt TypeScript die Eigenschaften
      if (width > 0 && height > 0) {
        mapContext.drawImage(typedCanvas, 0, 0, width, height);
      }})

    // Generiere das Base64 PNG-Bild
    this.mapImage = mapCanvas.toDataURL('image/png');
  }
}
