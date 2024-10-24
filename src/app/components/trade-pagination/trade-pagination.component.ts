import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradeResponse } from '../../models/trade.model';

@Component({
  selector: 'app-trade-pagination',
  standalone: true,
  templateUrl: './trade-pagination.component.html',
  styleUrls: ['./trade-pagination.component.css'
    ]
})
export class TradePaginationComponent {
 @Input() loading!: Boolean;
 @Input() tradeResponse!: TradeResponse;
 @Input() currentPage: number = 1;
 @Output() fetchTradesEvent = new EventEmitter<number>();

  nextPage(): void {
    if (this.tradeResponse && this.tradeResponse.has_next) {
      this.fetchTradesEvent.emit(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.tradeResponse && this.tradeResponse.has_previous) {
      this.fetchTradesEvent.emit(this.currentPage - 1);
    }
  }

  firstPage(): void {
    if (this.tradeResponse) {
      this.fetchTradesEvent.emit(1);
    }
  }

  lastPage(): void {
    if (this.tradeResponse) {
      this.fetchTradesEvent.emit(this.tradeResponse.total_pages);
    }
  }
}
