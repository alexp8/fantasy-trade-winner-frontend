import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() sleeperLeagueId!: string;
  @Output() sleeperLeagueIdChange = new EventEmitter<string>();
  @Output() fetchTradesEvent = new EventEmitter<number>();

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToMyLeague(event: MouseEvent): void {
    this.router.navigate(['/my-leagues']);
  }

  onSleeperLeagueIdChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.sleeperLeagueId = inputElement.value;
  }

  onLeagueIdInputChange(value: string) {
    this.sleeperLeagueIdChange.emit(value);
  }
}
