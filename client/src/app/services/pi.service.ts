import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PIService {

  constructor(private http: Http) { }

  getPIs() {
    return this.http.get('http://localhost:3000/pis/getlist')
    .map((res) => res.json());
  }

}
