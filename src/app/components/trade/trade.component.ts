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
  tradeResponse: TradeResponse | null = null;
  error: string | null = null;
  sleeperLeagueId: string = '';
  selectedTrade: Trade | null = null;
  currentPage: number = 1;
  loading: Boolean = false
  where_them_trades_at_url = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRwcXdpa2w1emdkZmNxY2pmam10eDdnZXY2ZWpxZmV2a3RtNzc3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OStrMR6ykemf0Bkk1x/giphy.webp"

  constructor(private tradeService: TradeService) {}

  ngOnInit(): void {
    
  }

  getPlayerImageUrl(sleeperPlayerId: string): string {
    return `https://sleepercdn.com/content/nfl/players/thumb/${sleeperPlayerId}.jpg`;
  }

  fetchTrades(page: number = 1): void {
    this.selectedTrade = null;
    this.selectedTrade = null;
    this.currentPage = page;

    if (!this.sleeperLeagueId) {
      this.error = 'Please enter a valid Sleeper League ID';
      return;
    }
    this.loading = true
    this.tradeService.getTrades(this.sleeperLeagueId, page).subscribe({
      next: (response: TradeResponse) => {
        this.tradeResponse = response;
        this.currentPage = response.page;
        this.error = null;
        this.loading = false
      },
      error: (err) => {
        this.error = 'Failed to fetch trades. Please try again.';
        console.error(err);
        this.loading = false
      }
    });
  }

  nextPage(): void {
    if (this.tradeResponse && this.tradeResponse.has_next) {
      this.fetchTrades(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.tradeResponse && this.tradeResponse.has_previous) {
      this.fetchTrades(this.currentPage - 1);
    }
  }

  selectTrade(trade: Trade): void {
    this.selectedTrade = trade;
  }
}
