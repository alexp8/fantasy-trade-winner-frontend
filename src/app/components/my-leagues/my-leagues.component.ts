import { Component } from '@angular/core';
import { LeagueResponse } from '../../models/league.model';
import { LeagueService } from '../../services/league.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-leagues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-leagues.component.html',
  styleUrl: './my-leagues.component.css'
})
export class MyLeaguesComponent {
  leagueResponses: LeagueResponse[] | null = null;
  loading: boolean = false;
  error: string | null = null
  userName: string | null = null
  leagueThumb: String = "https://sleepercdn.com/avatars/thumbs"
  loadingGif: String = "https://i.pinimg.com/originals/4d/0a/29/4d0a2935029461cd1135eeb9f0de58a4.gif"

  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {

  }

  getLeagueAvatar(avatar: string): string {
    return `${this.leagueThumb}/${avatar}`;
  }

  fetchUserLeagues(): void {
    this.leagueResponses = null;
    this.error = null;

    if (!this.userName) {
      this.error = 'Please enter a valid userName';
      return;
    }

    this.loading = true
    this.leagueService.getUserLeagues(this.userName).subscribe({
      next: (response: LeagueResponse[]) => {
        this.leagueResponses = response;
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.error = 'Failed to fetch user leagues. Please try again.';
      }
    });
  }

}
