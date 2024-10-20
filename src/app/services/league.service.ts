import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueResponse } from '../models/league.model';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // http://127.0.0.1:8000/api/get_leagues/burg93
  getUserLeagues(user_name: string): Observable<LeagueResponse[]> {
    let url: string = `${this.apiUrl}/api/get_leagues/${user_name}`;
  
    return this.http.get<LeagueResponse[]>(url);
  }
  
}
