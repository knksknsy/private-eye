import { Component, OnInit } from '@angular/core';
import { EnvironmentDataService } from '../../services/environment-data.service';
import Chart from 'chart.js';
import { ChartData } from '../../interfaces/chartdata';

@Component({
  selector: 'app-dashboard-chart-card',
  templateUrl: './dashboard-chart-card.component.html',
  styleUrls: ['./dashboard-chart-card.component.scss']
})
export class DashboardChartCardComponent implements OnInit {
  public chartData: Array<Number> = [];
  public chartLabels: Array<String> = [];
  public minMaxTemp: { min: number, max: number };
  public ctx: any;
  public lineChart: any;

  constructor(private environmentDataService: EnvironmentDataService) { }

  ngOnInit() {
    this.environmentDataService.getTempLiveData('ABC')
      .subscribe((liveData) => {
        let data: ChartData
        this.chartData = liveData.data;
        this.chartLabels = this.environmentDataService.formatLiveDataLabels(liveData.labels);
        this.minMaxTemp = this.environmentDataService.getMinMaxTemperature(this.chartData);
        this.chartData.pop();
        this.chartLabels.pop();
        data = {
          labels: this.chartLabels,
          datasets: [{ fill: false, data: this.chartData }]
        };
        this.ctx = document.getElementById('lineChart');
        this.lineChart = new Chart(this.ctx, {
          type: 'line',
          data: data,
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Temperatur in °C'
                }
              }]
            },
            elements: {
              point: {
                radius: 2,
              }
            }
          }
        });
      });
  }
}
