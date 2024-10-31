import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  menuItems = [
    { name: 'Trades', link: '/' },
    { name: 'Leaderboard', link: '/leaderboard' },
    { name: 'My Leagues', link: '/my-leagues' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ];
}
