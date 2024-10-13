import { Component } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { TradeResponse, Trade } from '../../models/trade.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent {
  trades: TradeResponse | null = null;
  error: string | null = null;
  sleeperLeagueId: string = '';
  selectedTrade: Trade | null = null;
  currentPage: number = 1;

  constructor(private tradeService: TradeService) {}

  ngOnInit(): void {
    
  }

  fetchTrades(sleeperLeagueId: string, page: number = 1): void {
    if (!sleeperLeagueId) {
      this.error = 'Please enter a valid Sleeper League ID';
      return;
    }

    this.tradeService.getTrades(sleeperLeagueId, page).subscribe({
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

  nextPage(): void {
    if (this.trades && this.trades.has_next) {
      this.fetchTrades(this.sleeperLeagueId, this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.trades && this.trades.has_previous) {
      this.fetchTrades(this.sleeperLeagueId, this.currentPage - 1);
    }
  }

  selectTrade(trade: Trade): void {
    this.selectedTrade = trade;
  }
}
