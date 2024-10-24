import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradeResponse } from '../../models/trade.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trade-home.component.html',
  styleUrls: ['./trade-home.component.css'
    ]
})
export class TradeHomeComponent {
 @Input() loading!: Boolean;
 sleeperLeagueId: string = '';
 @Output() sleeperLeagueIdChange = new EventEmitter<string>();
 @Output() fetchTradesEvent = new EventEmitter<number>();

  constructor(private router: Router) { }

   onSleeperLeagueIdChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newId = inputElement.value;
    this.sleeperLeagueId = newId;
    this.sleeperLeagueIdChange.emit(this.sleeperLeagueId);
  }

 goToMyLeague(event: MouseEvent): void {
    this.router.navigate(['/my-leagues']);
 }

  fetchTrades(): void {
    this.fetchTradesEvent.emit(1);
  }
}
