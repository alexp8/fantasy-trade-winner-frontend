import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TradeResponse } from '../models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // e.g. http://127.0.0.1:8000/api/get_league_trades/1071255073365331968?page=5&rosterId=all
  getTrades(sleeper_league_id: string, page: number, rosterId: string | null): Observable<TradeResponse> {
    let url: string = `${this.apiUrl}/api/get_league_trades/${sleeper_league_id}?page=${page}`;

    if (rosterId) {
      url += `&rosterId=${rosterId}`;
    }
  
    return this.http.get<TradeResponse>(url);
  }
  
}
