import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import L from 'leaflet';
import { PIService } from '../../services/pi.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() public onMarkerClicked: EventEmitter<any> = new EventEmitter();
  public map: any;
  public isMapMinimized: boolean = false;
  public maximizedMapHeight: number;
  public minimizedMapHeight: number;
  public styles: Array<{ style: string, selected: boolean }> = [
    { style: 'light_all', selected: true },
    { style: 'dark_all', selected: false }
  ];
  public lightStyle: boolean = true;
  public tileServer: string = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/{style}/{z}/{x}/{y}.png`;
  public lightMap: any;
  public darkMap: any;
  public maxZoom: number = 18;
  public attribution: string = 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.';
  public mapLoaded: boolean = false;

  constructor(private piService: PIService, private router: Router) { }

  ngOnInit() {
    this.initLayers();
    this.getLocation();
  }

  initLayers() {
    this.lightMap = L.tileLayer(this.tileServer, {
      maxZoom: this.maxZoom,
      style: 'light_all',
      attribution: this.attribution
    });
    this.darkMap = L.tileLayer(this.tileServer, {
      maxZoom: this.maxZoom,
      style: 'dark_all',
      attribution: this.attribution
    })
  }

  initMap(lat: number, lng: number): any {
    L.Map.prototype.panToOffset = function (latlng, offset, options) {
      var x = this.latLngToContainerPoint(latlng).x - offset[0];
      var y = this.latLngToContainerPoint(latlng).y - offset[1];
      var point = this.containerPointToLatLng([x, y]);
      return this.setView(point, this._zoom, { pan: options });
    }

    this.map = L.map("map").setView([lat, lng], 9)
      .on('zoomstart', (event) => {
        if (this.isMapMinimized) {
          this.isMapMinimized = !this.isMapMinimized;
        }
      });

    this.maximizedMapHeight = document.getElementById('map').offsetHeight / 2;
    // var icon = L.icon({
    //   iconUrl: 'assets/icons/private-eye-marker.png',
    //   iconSize: [49,72],
    //   iconAnchor: [49,25]
    // });

    this.map.addLayer(this.lightMap);

    this.isMapLoaded();

    this.piService.getPIs()
      .subscribe((pis) => {
        pis.forEach((element) => {
          // let marker = L.marker([element.latitude, element.longitude], { icon: icon, id: element._id })
          let marker = L.marker([element.latitude, element.longitude], { id: element._id })
            .on('click', (event) => {
              this.onMarkerClicked.emit(event.target.options.id);
              this.isMapMinimized = true;
              this.map.invalidateSize();
              setTimeout(() => {
                this.minimizedMapHeight = document.getElementById('map').offsetHeight / 2;
                this.map.panToOffset(event.target.getLatLng(), [0, -(this.maximizedMapHeight - this.minimizedMapHeight)]);
              }, 10);
            })
            .addTo(this.map);
        });
      });
  }

  public getLocation() {
    // set coordinates according to client's position
    navigator.geolocation.getCurrentPosition((location) => {
      if (!location) {
        this.initMap(48.759357, 9.162598);
      } else {
        this.initMap(location.coords.latitude, location.coords.longitude);
      }
    });
  }

  public isMapLoaded() {
    let map = document.getElementsByClassName('leaflet-container');
    this.mapLoaded = map.length > 0 ? true : false;
  }

  public changeMapStyle() {
    if (this.lightStyle) {
      this.map.removeLayer(this.lightMap);
      this.map.addLayer(this.darkMap);
    } else {
      this.map.removeLayer(this.darkMap);
      this.map.addLayer(this.lightMap);
    }
    this.lightStyle = !this.lightStyle;
  }

  public onMouseDown() {
    this.isMapMinimized = false;
    window.scrollTo(0, 0);
  }

}
