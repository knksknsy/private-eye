import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EnvironmentDataService {

  constructor(private http: Http, private datePipe: DatePipe) { }

  getLiveData(pi_id: string, sensor: string, mode: string) {
    return this.http.get('http://localhost:3000/' + sensor + '/' + mode + '/' + pi_id)
      .map((res) => res.json());
  }

  formatLiveDataLabels(labels: Array<String>): Array<String> {
    let formatedLabels = [];
    labels.forEach((label) => {
      let formatedLabel;
      formatedLabel = this.datePipe.transform(label, 'shortTime');
      formatedLabels.push(formatedLabel);
    });
    return formatedLabels;
  }

  getMinMaxValue(data: Array<Number>): { min: number, max: number } {
    return { min: Math.min.apply(null, data), max: Math.max.apply(null, data) };
  }

}
