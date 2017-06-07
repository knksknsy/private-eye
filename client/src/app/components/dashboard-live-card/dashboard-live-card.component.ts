import { Component, OnDestroy, OnChanges, Input } from '@angular/core';
import { EnvironmentDataService } from '../../services/environment-data.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-dashboard-live-card',
  templateUrl: './dashboard-live-card.component.html',
  styleUrls: ['./dashboard-live-card.component.scss']
})
export class DashboardLiveCardComponent implements OnChanges, OnDestroy {
  public modi = [
    { title: 'Live', name: 'live', selected: true },
    { title: 'Tag', name: 'day', selected: false },
    { title: 'Woche', name: 'week', selected: false },
    { title: 'Monat', name: 'month', selected: false },
    { title: 'Jahr', name: 'year', selected: false },
  ]

  public chartData: Array<Number> = [];
  public chartLabels: Array<String> = [];
  public minMaxValue: { min: number, max: number };

  public canvas: any;
  public ctx: any;
  public lineChart: any;
  public canvasID: string;

  private _sensor: string;
  private _piID: string;
  private _title: string;
  private _unit: string;

  get sensor(): string {
    return this._sensor;
  }

  @Input()
  set sensor(sensor: string) {
    this._sensor = sensor;
  }

  get piID(): string {
    return this._piID;
  }

  @Input()
  set piID(piID: string) {
    this._piID = piID;
  }

  get title(): string {
    return this._title;
  }

  @Input()
  set title(title: string) {
    this._title = title;
  }

  get unit(): string {
    return this._unit;
  }

  @Input()
  set unit(unit: string) {
    this._unit = unit;
  }

  constructor(private environmentDataService: EnvironmentDataService) { }

  ngOnDestroy() {
    this.lineChart.destroy();
  }

  ngOnChanges() {
    this.canvasID = this.sensor + this.title;
    this.environmentDataService.getLiveData(this.piID, this.sensor, 'month')
      .subscribe((liveData) => {
        // if (this.lineChart) {
        //   this.lineChart.destroy();
        // }
        this.initChart(liveData);
      });
  }

  public changeModus(modusName: string) {
    this.modi.forEach((modus) => {
      if (modus.name !== modusName) {
        modus.selected = false;
      } else {
        modus.selected = true;
      }
    });
  }

  public initChart(liveData) {
    if (document.getElementById(this.canvasID)) {
      let data: any;
      this.chartData = liveData.data;
      this.chartLabels = this.environmentDataService.formatLiveDataLabels(liveData.labels);
      this.minMaxValue = this.environmentDataService.getMinMaxValue(this.chartData);

      data = {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          label: this.title + ' in ' + this.unit,
          pointHoverBackgroundColor: 'rgba(255,255,255,1)',
          pointHoverBorderColor: 'rgba(28,119,184,1)'
        }]
      };
      this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasID);
      this.ctx = this.canvas.getContext('2d');
      this.lineChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: {
          legend: {
            display: false,
            labels: {
              fontSize: 25
            }
          },
          // scales: {
          //   yAxes: [{
          //     scaleLabel: {
          //       display: true,
          //       labelString: this.title + ' in ' + this.unit
          //     }
          //   }]
          // },
          elements: {
            point: {
              radius: 2,
              hoverRadius: 4
            },
            line: {
              fill: true,
              backgroundColor: 'rgba(28,119,184,0.5)',
              borderColor: 'rgba(28,119,184,1)'
            }
          }
        }
      });
    }
  }
}
