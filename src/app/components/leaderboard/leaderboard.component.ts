import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard.service';
import { LeaderboardResponse } from '../../models/leaderboard.model';
import { LeagueUser } from '../../models/trade.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
    loading: boolean = false;
    error: string | null = null
    userName: string | null = null
    leagueThumb: String = "https://sleepercdn.com/avatars/thumbs"
    loadingGif: String = "https://i.pinimg.com/originals/4d/0a/29/4d0a2935029461cd1135eeb9f0de58a4.gif"
    sleeperLeagueId: string | null = null;
    leaderboardResponse: LeaderboardResponse | null = null;

    constructor(private leaderboardService: LeaderboardService, private route: ActivatedRoute) { }


    ngOnInit(): void {

        this.sleeperLeagueId = this.route.snapshot.paramMap.get('sleeperLeagueId');

        if (this.sleeperLeagueId) {
            this.fetchLeaderboard();
        }
    }
    
    getLeagueAvatar(): string {
        return `${this.leagueThumb}/${this.leaderboardResponse?.league_avatar}`;
    }

    getRosterAvatar(rosterId: number): string {

        let leagueUser: LeagueUser | undefined = this.leaderboardResponse?.league_users.find(user => user.roster_id === rosterId);

        let avatar;
        if (leagueUser) {
            avatar = leagueUser.roster_avatar || this.getUserAvatar(leagueUser.user_avatar);
        }

        if (avatar) {
            return avatar;
        }

        return 'path/to/default/avatar.png';
    }

    getUserAvatar(userAvatar: string): string {
        return `${this.leagueThumb}/${userAvatar}`;
    }

    fetchLeaderboard(): void {
        this.error = null;

        if (!this.sleeperLeagueId) {
            this.error = 'Please enter a valid Sleeper League ID';
            return;
        }
        this.loading = true;
        this.leaderboardService.getLeaderboard(this.sleeperLeagueId).subscribe({
            next: (response: LeaderboardResponse) => {
                this.leaderboardResponse = response;
                this.loading = false;
            },
            error: (err) => {

                if (err.status === 404) {
                    this.error = 'Sleeper League ID does not exist.';
                    this.loading = false;
                } else if (err.status == 0) {
                    console.warn('Ignored error with status 0 - likely a transient network issue.');
                } else {
                    this.error = 'Failed to fetch leaderboard. Send report?';
                    this.loading = false;
                }
            }
        });

    }

}
