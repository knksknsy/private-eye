import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: any;
  public markers: Array<Array<Number>> = [];

  constructor() { }

  ngOnInit() {
    // set coordinates according to client's position
    this.map = L.map("map").setView([48.759357, 9.162598], 9);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoiZHNjaGVuZ2lzIiwiYSI6ImNqM2swYm1yZjAwNDEzMnA5eGpkeWV2b2YifQ.u4c09v8K-TaPSgMC6VCJhA'
    }).addTo(this.map);
    
  }

}
