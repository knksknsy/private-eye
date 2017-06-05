import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  private _piID: string;

  get piID(): string {
    return this._piID;
  }

  @Input()
  set piID(piID: string) {
    this._piID = piID;
  }

  constructor() { }

  ngOnChanges() {
    console.log('changed', this.piID);
  }

}
