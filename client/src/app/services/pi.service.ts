import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PIService {

  constructor(private http: Http) { }

  getPIs() {
    return this.http.get('http://localhost:3000/pis/list')
    .map((res) => res.json());
  }

  getPISensors(pi_id) {
    return this.http.get('http://localhost:3000/pis/sensors/' + pi_id)
    .map((res) => res.json());
  }

}
