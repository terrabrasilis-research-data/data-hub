import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { layerGroup, tileLayer, Layer, geoJSON } from 'leaflet';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})
export class DataMapComponent implements OnInit, LeafletModule {
  
  public layersControl: any;

  constructor() { }
	options = {
  };

  ngOnInit() {
    
    this.layersControl = {
      baseLayers: {
        'Google Hybrid':  tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' , { enebled: true, maxZoom: 18, attribution: '...', subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: { 
        'Geo JSON Polygon': geoJSON(
          ({
            type: 'Polygon',
    
            coordinates: [[
              [
                -67.92626,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                -3.89446
              ],
              [
                -67.92626,
                -3.89446
              ],
              [
                -67.92626,
                6.656333333333333
              ]]
            ]}) as any, { style: () => ({ color: '#ff7800' })})
      }
    }
    
    this.options = 	{ 
      zoom: 4,
      center: this.layersControl.overlays['Geo JSON Polygon'].getBounds().getCenter(),
      layers: [ this.layersControl.baseLayers['Google Hybrid'], this.layersControl.overlays['Geo JSON Polygon'] ]
    }


  }

}
