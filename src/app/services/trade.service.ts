import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TradeResponse } from '../models/trade.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // e.g. /api/get_league_trades/1071255073365331968?page=5&rosterId=all
  getTrades(sleeper_league_id: string, page: number, rosterId: string | null, transaction_id: string | null): Observable<TradeResponse> {
    let url: string = `${this.apiUrl}/api/get_league_trades/${sleeper_league_id}?page=${page}`;

    if (rosterId) {
      url += `&rosterId=${rosterId}`;
    }

    if (transaction_id) {
      url += `&transactionId=${transaction_id}`;
    }
  
    return this.http.get<TradeResponse>(url);
  }
  
}
