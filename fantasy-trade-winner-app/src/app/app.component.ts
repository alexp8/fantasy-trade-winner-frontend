import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fantasy-trade-winner-app';

  searchTerm1 = '';
  searchTerm2 = '';
  filteredOptions1$: Observable<string[]> = of([]);
  filteredOptions2$: Observable<string[]> = of([]);

  constructor(private http: HttpClient) {
    this.filteredOptions1$ = of([]);
    this.filteredOptions2$ = of([]);
  }

  private fetchOptions(searchTerm: string, apiUrl: string): Observable<string[]> {
    if (!searchTerm.trim()) {
      return of([]);
    }
    return this.http.get<string[]>(`${apiUrl}/${searchTerm}`).pipe(
      catchError(() => of([]))
    );
  }

  onSearch1Change(value: string) {
    this.filteredOptions1$ = this.fetchOptions(value, 'http://127.0.0.1:8000/api/get_players_like');
  }

  onSearch2Change(value: string) {
    this.filteredOptions2$ = this.fetchOptions(value, 'http://127.0.0.1:8000/api/get_players_like');
  }
}
