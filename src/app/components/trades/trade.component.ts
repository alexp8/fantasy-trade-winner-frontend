import { Component } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { TradeResponse } from '../../models/trade.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add CommonModule here
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent {
  trades: TradeResponse | null = null;
  error: string | null = null;

  constructor(private tradeService: TradeService) {}

  fetchTrades(sleeper_league_id: string, page: number = 1): void {
    if (!sleeper_league_id) {
      this.error = 'Please enter a valid Sleeper League ID';
      return;
    }

    this.tradeService.getTrades(sleeper_league_id, page).subscribe({
      next: (response: TradeResponse) => {
        this.trades = response;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Failed to fetch trades. Please try again.';
        console.error(err);
      }
    });
  }
}
