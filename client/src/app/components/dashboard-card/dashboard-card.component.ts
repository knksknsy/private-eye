import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnChanges, Input, ViewChild } from '@angular/core';
import { EnvironmentDataService } from '../../services/environment-data.service';
import Chart from 'chart.js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnChanges, OnDestroy {
  @ViewChild('pop') modiPopover;
  public modi = [
    { title: 'Live', name: 'live', selected: true },
    { title: 'Tag', name: 'day', selected: false },
    { title: 'Woche', name: 'week', selected: false },
    { title: 'Monat', name: 'month', selected: false },
    { title: 'Jahr', name: 'year', selected: false },
  ]
  public defaultModus = { title: 'Live', name: 'live' };

  public dataOb: Observable<any>;
  public dataSub: Subscription;

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
    this.unsubscribeData();
  }

  ngOnChanges() {
    this.canvasID = this.sensor + this.title;
    this.getContinuesData(this.defaultModus.name);
  }

  public unsubscribeData() {
    this.dataOb = undefined;
    this.dataSub.unsubscribe();
  }

  public changeModus(modusName: string) {
    this.unsubscribeData();

    this.modi.forEach((modus) => {
      if (modus.name !== modusName) {
        modus.selected = false;
      } else {
        modus.selected = true;
        this.defaultModus.title = modus.title;
      }
    });

    if (modusName === this.defaultModus.name) {
      this.getContinuesData(modusName);

    } else {
      this.getData(modusName);
    }
    this.modiPopover.hide();
  }

  public getContinuesData(modus: string) {
    this.dataOb = this.environmentDataService.getData(this.piID, this.sensor, modus);
    this.dataSub = this.dataOb.expand(() => {
      return Observable.timer(5000).concatMap(() => this.dataOb)
    }).subscribe((data) => {
      if (this.lineChart) {
        this.lineChart.destroy();
      }
      this.initChart(data, false);
    });
  }

  public getData(modus: string) {
    this.environmentDataService.getData(this.piID, this.sensor, modus)
      .subscribe((data) => {
        if (this.lineChart) {
          this.lineChart.destroy();
        }
        this.initChart(data, true);
      });
  }

  public initChart(liveData, animation: boolean) {
    if (document.getElementById(this.canvasID)) {
      let data: any;
      this.chartData = liveData.data;
      this.chartLabels = this.environmentDataService.formatDataLabels(liveData.labels);
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
      let options = {
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
      }
      if (!animation) {
        options.options['animation'] = false;
      }
      this.lineChart = new Chart(this.ctx, options);
    }
  }
}
