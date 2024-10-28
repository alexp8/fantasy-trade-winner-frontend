import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradeResponse } from '../../models/trade.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trade-pagination.component.html',
  styleUrls: ['./trade-pagination.component.css'
    ]
})
export class TradePaginationComponent {
 @Input() loading!: Boolean;
 @Input() tradeResponse!: TradeResponse;
 @Input() currentPage: number = 1;
 @Output() fetchTradesEvent = new EventEmitter<number>();
 pages: number[] = [];


  ngOnChanges(): void {
    this.updatePaginationButtons();
  }

  goToPage(page: number): void {
    if (page !== this.tradeResponse.page) {
      this.fetchTradesEvent.emit(page);
    }
  }

  updatePaginationButtons(): void {
    const currentPage = this.tradeResponse.page;
    const totalPages = this.tradeResponse.total_pages;

    this.pages = [];

    // Always add the first page
    if (totalPages > 0) {
      this.pages.push(1);
    }

    // Add two pages before the current page, if within bounds
    for (let i = 2; i >= 1; i--) {
      const page = currentPage - i;
      if (page > 1) {
        this.pages.push(page);
      }
    }

    // Add the current page
    if (currentPage > 1 && currentPage < totalPages) {
      this.pages.push(currentPage);
    }

    // Add two pages after the current page, if within bounds
    for (let i = 1; i <= 2; i++) {
      const page = currentPage + i;
      if (page < totalPages) {
        this.pages.push(page);
      }
    }

    // Always add the last page
    if (totalPages > 1) {
      this.pages.push(totalPages);
    }

    console.log(this.pages);
  }
}
