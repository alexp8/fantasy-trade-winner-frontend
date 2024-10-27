import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { TradeResponse, Trade, LeagueUser } from '../../models/trade.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from '../chart/line-chart.component';
import { TradePaginationComponent } from '../trade-pagination/trade-pagination.component';
import { TradeHomeComponent } from '../trade-home/trade-home.component';
import { TradeScrollItemComponent } from './trade-scroll-item.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CommonModule, FormsModule, LineChartComponent, TradePaginationComponent, TradeHomeComponent, TradeScrollItemComponent],
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  tradeResponse: TradeResponse | null = null;
  error: string | null = null;
  sleeperLeagueId: string | null = '';
  selectedTrade: Trade | null = null;
  selectedTradeId: string | null = null;
  currentPage: number = 1;
  loading: Boolean = false
  where_them_trades_at_url = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRwcXdpa2w1emdkZmNxY2pmam10eDdnZXY2ZWpxZmV2a3RtNzc3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OStrMR6ykemf0Bkk1x/giphy.webp"
  selectedRoster: string = 'all';
  leagueThumb: String = "https://sleepercdn.com/avatars/thumbs"
  playerThumb: String = "https://sleepercdn.com/content/nfl/players/thumb"
  dropdownOpen = false;
  selectedRosterId: number | string = "all";
  selectedUser: LeagueUser | null = null;

  constructor(private tradeService: TradeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sleeperLeagueId = this.route.snapshot.paramMap.get('sleeperLeagueId');
    this.selectedRosterId = this.route.snapshot.queryParamMap.get('rosterId') || "all";
    this.currentPage =  Number(this.route.snapshot.queryParamMap.get('page')) || 1;
    this.selectedTradeId = this.route.snapshot.queryParamMap.get('tradeId') || null;

    if (this.sleeperLeagueId) {
      this.fetchTrades(this.currentPage, this.selectedRosterId);
    }
  }

  onLeagueIdChange(newLeagueId: string) {
    this.sleeperLeagueId = newLeagueId;

    this.router.navigate(['trades', newLeagueId]);
  }

  getPlayerImageUrl(sleeperPlayerId: string): string {
    return `${this.playerThumb}/${sleeperPlayerId}.jpg`;
  }

  getLeagueAvatar(): string {
    return `${this.leagueThumb}/${this.tradeResponse?.league_avatar}`;
  }

  getUserAvatar(userAvatar: string): string {
    return `${this.leagueThumb}/${userAvatar}`;
  }

  navigateToMyLeagues() {
    this.router.navigate(['/my-leagues']);
  }

  getRosterAvatar(rosterId: number): string {

    let leagueUser: LeagueUser | undefined = this.tradeResponse?.league_users.find(user => user.roster_id === rosterId);

    let avatar;
    if (leagueUser) {
      avatar = leagueUser.roster_avatar || this.getUserAvatar(leagueUser.user_avatar);
    }

    if (avatar) {
      return avatar;
    }

    return 'path/to/default/avatar.png';
  }

  fetchTrades(page: number = 1, rosterId: string = "all"): void {
    this.selectedTrade = null;
    this.currentPage = page;
    this.error = null;

    this.router.navigate([], { 
      queryParams: { page },
      queryParamsHandling: 'merge'
    });

    if (!this.sleeperLeagueId) {
      this.error = 'Please enter a valid Sleeper League ID';
      return;
    }
    this.loading = true;
    this.tradeService.getTrades(this.sleeperLeagueId, page, rosterId, selectedTradeId).subscribe({
      next: (response: TradeResponse) => {
        this.tradeResponse = response;
        this.currentPage = response.page;
        this.loading = false;

        if (rosterId != "all") {
          this.selectedUser = this.tradeResponse?.league_users.find(user => user.roster_id.toString() === rosterId.toString()) || null;
        }

        if (this.selectedTradeId != null) {
          this.selectTrade = this.tradeResponse?.trades.find(trade => trade.transaction_id === this.selectedTradeId) || null;
        }
      },
      error: (err) => {

        if (err.status === 404) {
          this.error = 'Sleeper League ID does not exist.';
          this.loading = false;
        } else if (err.status == 0) {
          console.warn('Ignored error with status 0 - likely a transient network issue.');
          // If you open the 'trades' component with a leagueId, the API immediately throws an exception with statusCode=0, then the API completes successfully. why??
        } else {
          this.error = 'Failed to fetch trades. Please try again.';
          this.loading = false;
        }
      }
    });

  }

  selectTrade(trade: Trade): void {
    this.selectedTrade = trade;
  }

  updateTrades(event: any): void {
    const selectedValue = event.target.value;
    this.fetchTrades(1, selectedValue);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectUser(rosterId: number | string = "all"): void {

    if (rosterId == this.selectedRosterId)
      return;

    this.selectedRosterId = rosterId;
    this.dropdownOpen = false;

    this.fetchTrades(1, `${rosterId}`);
    this.selectedUser = this.tradeResponse?.league_users.find(user => user.roster_id === rosterId) || null;

    this.router.navigate([], { 
      queryParams: { rosterId },
      queryParamsHandling: 'merge'
    });
  }
}
