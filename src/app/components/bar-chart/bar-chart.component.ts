import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";
import * as chroma from 'chroma-js';
import { randomRGB } from "../../utils/helpers";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() label!: string;
  @Input() labels!: string[];
  @Input() data!: number[];

  barChart: any = [];
  colors: string[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // for (let index = 0; index < this.labels.length; index++) {
    //   this.colors.push(randomRGB());
    // }
    this.colors = chroma.bezier(['#ED8B4E', '#F54EA2', '#7117EA', '#5B247A', '#622774', '#42E695'])
      .scale()
      .colors(this.labels.length);

    this.barChart = new Chart("bar_chart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.data,
          backgroundColor: this.colors,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: this.label,
            font: {
              weight: 'bold',
              size: 16,
              family: 'Montserrat',
            },
            color: '#404244',
          },
        }
      }
    });
  }

}
