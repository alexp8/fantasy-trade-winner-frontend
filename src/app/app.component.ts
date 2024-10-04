import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule, 
    MatOptionModule,
    MatNativeDateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fantasy_trades_web_app';

  searchTerm1 = '';
  searchTerm2 = '';
  filteredOptions1$: Observable<string[]> = of([]);
  filteredOptions2$: Observable<string[]> = of([]);

  constructor(private http: HttpClient) {}

  private hitApi(searchTerm: string, apiUrl: string): Observable<string[]> {
    if (!searchTerm.trim()) {
      return of([]);
    }
    return this.http.get<string[]>(`${apiUrl}/${searchTerm}`).pipe(
      catchError(() => of([]))
    );
  }

  private fetchOptions(searchTerm: string, apiUrl: string): Observable<string[]> {
    return this.hitApi(searchTerm, apiUrl).pipe(
      map(options =>
        options.filter(option =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    console.log('Selected date:', selectedDate);
  }

  onSearch1Change(value: string): void {
    this.filteredOptions1$ = this.fetchOptions(value, 'http://127.0.0.1:8000/api/get_players_like');
    this.filteredOptions1$.subscribe(options => {
      console.log('Filtered Options 1:', options);
    });
  }

  onSearch2Change(value: string): void {
    this.filteredOptions2$ = this.fetchOptions(value, 'http://127.0.0.1:8000/api/get_players_like');
    this.filteredOptions2$.subscribe(options => {
      console.log('Filtered Options 2:', options);
    });
  }
}
