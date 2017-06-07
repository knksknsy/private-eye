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
  public markers: Array<Array<Number>> = [];
  public options: { id: string };
  public isMapMinimized: boolean = false;
  public maximizedMapHeight: number;
  public minimizedMapHeight: number;
  public design: string = "dark";

  constructor(private piService: PIService, private router: Router) { }

  ngOnInit() {
    // set coordinates according to client's position
    navigator.geolocation.getCurrentPosition((location) => {
      if (!location) {
        this.initMap(48.759357, 9.162598);
      } else {
        this.initMap(location.coords.latitude, location.coords.longitude);
      }
    });
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

    L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}`, {
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoiZHNjaGVuZ2lzIiwiYSI6ImNqM2swYm1yZjAwNDEzMnA5eGpkeWV2b2YifQ.u4c09v8K-TaPSgMC6VCJhA'
    }).addTo(this.map);

    this.piService.getPIs()
      .subscribe((pis) => {
        pis.forEach((element) => {
          // let marker = L.marker([element.latitude, element.longitude], { icon: icon, id: element._id })
          let marker = L.marker([element.latitude, element.longitude], { id: element._id })
            .on('click', (event) => {
                console.log(event);
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

  public onMouseDown() {
    this.isMapMinimized = false;
    window.scrollTo(0,0);
  }

}
