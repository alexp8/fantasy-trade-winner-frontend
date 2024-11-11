import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueResponse } from '../models/league.model';
import { environment } from '../../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserLeagues(user_name: string): Observable<LeagueResponse[]> {
    let url: string = `${this.apiUrl}/api/get_leagues/${user_name}`;
  
    return this.http.get<LeagueResponse[]>(url);
  }
  
}
