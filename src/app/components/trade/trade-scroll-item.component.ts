import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-scroll-item',
  standalone: true,
  template: `
    <div>
      <p class="user-name">{{ tradeData.user_name }}</p>
      <p *ngIf="tradeData.most_valuable_player">{{ tradeData.most_valuable_player }}</p>
      <p *ngIf="tradeData.most_valuable_draft_pick">{{ tradeData.most_valuable_draft_pick }}</p>
      <p *ngIf="tradeData.fab > 0">\${{ tradeData.fab }}</p>
    </div>
  `,
  styles: [`
    .user-name { font-size: larger; font-weight: bold; }
  `],
  imports: [CommonModule]
})
export class TradeScrollItemComponent {
  @Input() tradeData: any;
}