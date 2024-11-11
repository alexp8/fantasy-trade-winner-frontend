import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaderboardResponse } from '../models/leaderboard.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLeaderboard(leagueId: string): Observable<LeaderboardResponse> {
    let url: string = `${this.apiUrl}/api/get_leaderboard/${leagueId}`;
  
    return this.http.get<LeaderboardResponse>(url);
  }
  
}
