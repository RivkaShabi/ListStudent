import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  imports: [CommonModule, BaseChartDirective],
  standalone: true,
})
export class ChartComponent implements OnChanges {
  @Input() title: string = '';
  @Input() arrGraph1: number[] = [];
  @Input() arrDate: number[] | string[] = [];
  @Input() txtGraph1: string = '';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true }, 
      y: { beginAtZero: true }  
    }
  };

  public barChartType: ChartType = 'bar'; 

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['arrGraph1'] || changes['arrDate']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.barChartData.datasets = [
      {
        data: this.arrGraph1,
        label: this.txtGraph1,
        backgroundColor: '#42A5F5', 
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ];

    this.barChartData.labels = this.arrDate;

    if (this.chart?.chart) {
      this.chart.chart.update(); 
    }
  }

}
