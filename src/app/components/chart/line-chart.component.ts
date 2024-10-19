import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Trade } from '../../models/trade.model';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() trade!: Trade;
  private chart: Chart | undefined;

  constructor() {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController);

  }

  ngOnInit(): void {
    this.renderChart(this.trade);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trade']) {
      this.renderChart(this.trade);
    }
  }

  renderChart(trade: Trade): void {
    const ctx = document.getElementById('ktcLineChart') as HTMLCanvasElement;

    const datasets = this.extractPlayerKtcValues(trade);

    const chartData = {
      labels: datasets[0].data.map(item => item.date),  // x-axis (dates)
      datasets: datasets.map(dataset => ({
        label: dataset.label,  // Player's name as the label
        data: dataset.data.map(item => item.ktc_value),  // y-axis (ktc_values)
        borderColor: dataset.won ? 'green' : 'red',  // Green for won, red for lost
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }))
    };

    const options = {
      scales: {
        x: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'KTC Value'
          }
        }
      }
    };

      // Destroy the previous chart instance before creating a new one
      if (this.chart) {
        this.chart.destroy();
      }

    // Initialize the Chart
    this.chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options
    });
  }

  extractPlayerKtcValues(trade: Trade) {
    const datasets: { label: string; data: { ktc_value: number; date: string }[]; won: boolean }[] = [];

    // Loop through the roster IDs in the trade
    trade.roster_ids.forEach(rosterId => {
      const roster = trade[rosterId];

      // For each player in the TradeRoster
      roster.players.forEach(player => {
        datasets.push({
          label: player.player_name,
          won: roster.won,
          data: player.ktc_values.map(ktc => ({
            ktc_value: ktc.ktc_value,
            date: ktc.date
          }))
        });
      });

      roster.draft_picks.forEach(draft_pick => {
        
        const valuesArray = datasets[0].data.map(item => ({
          ktc_value: draft_pick.latest_value,
          date: item.date
        }));
  
        datasets.push({
          label: draft_pick.description,
          won: roster.won,
          data: valuesArray
        });
      });
    });

    return datasets;
  }
}
