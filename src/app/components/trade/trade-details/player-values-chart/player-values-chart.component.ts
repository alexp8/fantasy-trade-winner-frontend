import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {
  Chart,
  ChartOptions,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
} from 'chart.js';
import { KtcValue, Trade } from '../../../../models/trade.model';
import 'chartjs-adapter-date-fns';

interface DataPoint {
  x: string;  // Date as a string
  y: number;  // KTC value
}

@Component({
  selector: 'app-player-values-chart',
  standalone: true,
  templateUrl: './player-values-chart.component.html',
  styleUrls: ['./player-values-chart.component.css']
})
export class PlayerValuesChartComponent implements OnInit {

  @Input() trade!: Trade | null;
  private chart: Chart<'line', DataPoint[]> | undefined

  private greenShades = [
    '#66bb6a',
    '#4caf50', // Standard green
    '#43a047',
    '#388e3c',
    '#2e7d32',
    '#1b5e20',  // Dark green
    '#e0f7e0', // Light green
    '#c8e6c9',
    '#a5d6a7',
    '#81c784'
  ];

  private redShades = [
    '#f44336', // Standard red
    '#e53935',
    '#d32f2f',
    '#c62828',
    '#b71c1c',   // Dark red
    '#ffebee', // Light red
    '#ffcdd2',
    '#ef9a9a',
    '#e57373',
    '#ef5350'
  ];

  constructor() {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, TimeScale, Tooltip, Legend, LineController);
  }

  ngOnInit(): void {
    if (this.trade)
      this.renderChart(this.trade);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trade'] && this.trade) {
      this.renderChart(this.trade);
    }
  }

  renderChart(trade: Trade): void {
    const ctx = document.getElementById('ktcLineChart') as HTMLCanvasElement;

    const datasets = this.extractPlayerKtcValues(trade);

    const chartData = {
      datasets: datasets.map((dataset, index) => ({
        label: dataset.label,  // Player's name as the label
        data: dataset.data.map(item => ({ x: item.date, y: item.ktc_value })),  // Format data with { x, y } for dates and values
        borderColor: dataset.won ? this.greenShades[index % this.greenShades.length] : this.redShades[index % this.redShades.length],
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }))
    };

    const options: ChartOptions<'line'> = {  // Specify the type of options
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
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
      options: options as ChartOptions<'line'>
    });
  }

  extractPlayerKtcValues(trade: Trade) {
    const datasets: { label: string; is_trade: boolean; data: { ktc_value: number; date: string }[]; won: boolean }[] = [];

    // Loop through the roster IDs in the trade
    trade.roster_ids.forEach(rosterId => {
      const roster = trade[rosterId];

      // For each player in the TradeRoster
      roster.players.forEach(player => {
        datasets.push({
          label: player.player_name,
          won: roster.won,
          is_trade: false,
          data: player.ktc_values.map(ktc => ({
            ktc_value: ktc.ktc_value,
            date: ktc.date
          }))
        });
      });

      // graph the draft picks
      roster.draft_picks.forEach(draft_pick => {
        let ktc_values: KtcValue[] = [];
        let label = draft_pick.description;

        // set ktc_values to the drafted_player, or if future pick set a static ktc value
        if (draft_pick.player_drafted) {
          ktc_values = draft_pick.player_drafted.ktc_values;

          // ktc_values.forEach(value => {
          //   console.log(`Name: ${draft_pick.player_drafted?.player_name}, Date: ${value.date}, Value: ${value.ktc_value}`);
          // });

          label = draft_pick.description + " (" + draft_pick.player_drafted.player_name + ")";
        } else if (roster.players.length > 0) {
          ktc_values = roster.players[0].ktc_values.map(ktc => ({
            ktc_value: draft_pick.latest_value,
            date: ktc.date
          }));
        }

        if (ktc_values.length != 0) {

          datasets.push({
            label: label,
            won: roster.won,
            is_trade: true,
            data: ktc_values.map(ktc => ({
              ktc_value: ktc.ktc_value,
              date: ktc.date
            }))
          });
          // ktc_values.forEach(value => {
          //   console.log(`Name: ${draft_pick.player_drafted?.player_name}, Date: ${value.date}, Value: ${value.ktc_value}`);
          // });
        }

      });

    });

    return datasets;
  }
}
