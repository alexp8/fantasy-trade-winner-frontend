import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'trade-item',
  standalone: true
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.css']
})
export class TradeItemComponent {

  @Input() selectedTrade: any;

  onSelect() {
    this.selectTrade.emit(this.trade);
  }
}
