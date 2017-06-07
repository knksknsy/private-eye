import { Component, OnChanges, Input } from '@angular/core';
import { PIService } from '../../services/pi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  private _piID: string;
  public sensors: Array<String>;

  get piID(): string {
    return this._piID;
  }

  @Input()
  set piID(piID: string) {
    this._piID = piID;
  }

  constructor(private piService: PIService) { }

  ngOnChanges() {
    this.piService.getPISensors(this.piID)
    .subscribe((sensors) => {
      this.sensors = sensors;
      console.log('sensors', this.sensors);
    });
    console.log('changed', this.piID);
  }

}
