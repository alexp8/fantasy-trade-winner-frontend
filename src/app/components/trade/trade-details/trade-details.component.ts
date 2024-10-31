import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerValuesChartComponent } from './player-values-chart/player-values-chart.component';
import { LeagueUser, Trade } from '../../../models/trade.model';

@Component({
    selector: 'app-trade-details',
    standalone: true,
    imports: [CommonModule, FormsModule, PlayerValuesChartComponent],
    templateUrl: './trade-details.component.html',
    styleUrls: ['./trade-details.component.css']
})
export class TradeDetailsComponent {
    @Input() selectedTrade: Trade | null = null;
    @Input() leagueUsers!: LeagueUser[];
    playerThumb: String = "https://sleepercdn.com/content/nfl/players/thumb";
    leagueThumb: String = "https://sleepercdn.com/avatars/thumbs"

    constructor() { }

    getPlayerImageUrl(sleeperPlayerId: string): string {
        return `${this.playerThumb}/${sleeperPlayerId}.jpg`;
    }

    getUserAvatar(userAvatar: string): string {
        return `${this.leagueThumb}/${userAvatar}`;
    }

    getRosterAvatar(rosterId: number): string {
        if (this.leagueUsers) {
            let leagueUser: LeagueUser | undefined = this.leagueUsers.find(user => user.roster_id === rosterId);

            let avatar;
            if (leagueUser) {
                avatar = leagueUser.roster_avatar || this.getUserAvatar(leagueUser.user_avatar);
            }

            if (avatar) {
                return avatar;
            }
        }
        return 'path/to/default/avatar.png';
    }
}
