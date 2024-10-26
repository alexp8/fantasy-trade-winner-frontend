import { Component } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { TradeResponse, Trade, LeagueUser } from '../../models/trade.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from '../chart/line-chart.component';
import { TradePaginationComponent } from '../trade-pagination/trade-pagination.component';
import { TradeHomeComponent } from '../trade-home/trade-home.component';
import { TradeScrollItemComponent } from './trade-scroll-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CommonModule, FormsModule, LineChartComponent, TradePaginationComponent, TradeHomeComponent, TradeScrollItemComponent],
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
  selectedRoster: string = 'all';
  leagueThumb: String = "https://sleepercdn.com/avatars/thumbs"
  playerThumb: String = "https://sleepercdn.com/content/nfl/players/thumb"
  dropdownOpen = false;
  selectedUser: LeagueUser | null = null;

  constructor(private tradeService: TradeService, private router: Router) { }

  ngOnInit(): void {

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

    if (!this.sleeperLeagueId) {
      this.error = 'Please enter a valid Sleeper League ID';
      return;
    }
    this.loading = true
    this.tradeService.getTrades(this.sleeperLeagueId, page, rosterId).subscribe({
      next: (response: TradeResponse) => {
        this.tradeResponse = response;
        this.currentPage = response.page;
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        if (err.status === 404) {
          this.error = 'Sleeper League ID does not exist.';
        } else {
          this.error = 'Failed to fetch trades. Please try again.';
        }
      }
    });
  }

  selectTrade(trade: Trade): void {
    this.selectedTrade = trade;
  }

  updateTrades(event: any): void {
    const selectedValue = event.target.value;
    console.log(`updateTrades ${selectedValue}`)
    this.fetchTrades(1, selectedValue);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectUser(user: LeagueUser | null): void {

    if (user == this.selectedUser)
      return;

    this.selectedUser = user;
    this.dropdownOpen = false;

    if (this.selectedUser != null) {
      this.fetchTrades(1, `${this.selectedUser.roster_id}`);
    } else {
      this.fetchTrades(1);
    }
  }
}
