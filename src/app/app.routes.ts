import { provideRouter, Routes } from '@angular/router';
import { TradeComponent } from './components/trade/trade.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyLeaguesComponent } from './components/my-leagues/my-leagues.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { FeedbackViewComponent } from './components/view-feedback/view-feedback.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trades', pathMatch: 'full' },
  { path: 'trades', component: TradeComponent },
  { path: 'trades/:sleeperLeagueId', component: TradeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'my-leagues', component: MyLeaguesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'view-feedback', component: FeedbackViewComponent }
];

export const appRoutes = provideRouter(routes);
